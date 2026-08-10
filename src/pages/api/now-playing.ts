import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

interface SpotifyEnv {
	SPOTIFY_CLIENT_ID: string;
	SPOTIFY_CLIENT_SECRET: string;
	SPOTIFY_REFRESH_TOKEN: string;
}

interface SpotifyArtist {
	name: string;
}

interface SpotifyTrack {
	name: string;
	artists: SpotifyArtist[];
	album?: { images?: { url: string }[] };
	external_urls?: { spotify?: string };
}

interface NowPlayingPayload {
	isPlaying: boolean;
	title: string;
	artist: string;
	albumArt: string | null;
	url: string;
}

interface CachedToken {
	accessToken: string;
	expiresAt: number;
}

// Persists across requests handled by the same Worker isolate, so most polls
// reuse it instead of hitting Spotify's token endpoint every 30s.
let cachedToken: CachedToken | null = null;

async function getAccessToken(spotifyEnv: SpotifyEnv): Promise<string> {
	if (cachedToken && cachedToken.expiresAt > Date.now()) {
		return cachedToken.accessToken;
	}

	const basicAuth = btoa(`${spotifyEnv.SPOTIFY_CLIENT_ID}:${spotifyEnv.SPOTIFY_CLIENT_SECRET}`);
	const response = await fetch(TOKEN_URL, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basicAuth}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: spotifyEnv.SPOTIFY_REFRESH_TOKEN,
		}),
	});

	if (!response.ok) {
		throw new Error(`Spotify token refresh failed: ${response.status}`);
	}

	const data = (await response.json()) as { access_token: string; expires_in: number };
	cachedToken = {
		accessToken: data.access_token,
		expiresAt: Date.now() + (data.expires_in - 60) * 1000,
	};

	return cachedToken.accessToken;
}

function toPayload(track: SpotifyTrack, isPlaying: boolean): NowPlayingPayload {
	return {
		isPlaying,
		title: track.name,
		artist: track.artists.map((artist) => artist.name).join(', '),
		albumArt: track.album?.images?.[0]?.url ?? null,
		url: track.external_urls?.spotify ?? '',
	};
}

function jsonResponse(payload: NowPlayingPayload | null, status: number, cache: boolean): Response {
	return new Response(JSON.stringify(payload), {
		status,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': cache ? 'public, max-age=15' : 'no-store',
		},
	});
}

export const GET: APIRoute = async () => {
	try {
		const accessToken = await getAccessToken(env as unknown as SpotifyEnv);
		const authHeader = { Authorization: `Bearer ${accessToken}` };

		const nowPlayingResponse = await fetch(NOW_PLAYING_URL, { headers: authHeader });

		if (nowPlayingResponse.status === 200) {
			const data = (await nowPlayingResponse.json()) as { is_playing: boolean; item: SpotifyTrack | null } | null;
			if (data?.item && data.is_playing) {
				return jsonResponse(toPayload(data.item, true), 200, true);
			}
		}

		const recentResponse = await fetch(RECENTLY_PLAYED_URL, { headers: authHeader });
		if (!recentResponse.ok) {
			throw new Error(`Spotify recently-played request failed: ${recentResponse.status}`);
		}

		const recentData = (await recentResponse.json()) as { items: { track: SpotifyTrack }[] };
		const lastTrack = recentData.items?.[0]?.track;

		if (!lastTrack) {
			return jsonResponse(null, 200, true);
		}

		return jsonResponse(toPayload(lastTrack, false), 200, true);
	} catch (error) {
		console.error('now-playing error', error);
		return jsonResponse(null, 502, false);
	}
};
