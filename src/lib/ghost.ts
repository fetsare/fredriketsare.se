import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
  url: import.meta.env.GHOST_API_URL,
  key: import.meta.env.GHOST_CONTENT_API_KEY,
  version: 'v5.0',
});

export interface GhostPost {
  id: string;
  slug: string;
  url: string;
  title: string;
  html: string;
  excerpt: string | null;
  custom_excerpt: string | null;
  feature_image: string | null;
  feature_image_alt: string | null;
  published_at: string;
  tags: Array<{ id: string; name: string; slug: string }>;
  featured: boolean;
  meta_title: string | null;
  meta_description: string | null;
}

// locale='en'  → only posts tagged with internal tag #lang-en
// locale='sv'  → posts NOT tagged #lang-en (includes untagged posts)
// omitted      → all posts
export async function getAllPosts(locale?: 'sv' | 'en'): Promise<GhostPost[]> {
  let filter: string | undefined;
  if (locale === 'en') filter = 'tag:hash-lang-en';
  else if (locale === 'sv') filter = 'tag:-hash-lang-en';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = {
    limit: 'all',
    include: ['tags'],
    order: 'published_at DESC',
  };
  if (filter) params.filter = filter;

  return api.posts.browse(params) as unknown as GhostPost[];
}

export async function getPostBySlug(slug: string): Promise<GhostPost> {
  return api.posts.read({ slug }, { include: ['tags'] }) as unknown as GhostPost;
}

export interface GalleryResult {
  images: string[];
  url: string;
}

export async function getLatestGallery(): Promise<GalleryResult | null> {
  try {
    const page = await api.pages.read(
      { slug: 'bilder' },
      {},
    ) as unknown as { html: string; url: string };
    const images = extractFirstGalleryImages(page.html);
    return images.length > 0 ? { images, url: page.url } : null;
  } catch {
    return null;
  }
}

function toThumbnailUrl(url: string): string {
  return url.replace('/content/images/', '/content/images/size/w600/');
}

function extractFirstGalleryImages(html: string): string[] {
  const markerIdx = html.indexOf('kg-gallery-card');
  if (markerIdx === -1) return [];

  const figStart = html.lastIndexOf('<figure', markerIdx);
  if (figStart === -1) return [];

  const figEnd = html.indexOf('</figure>', markerIdx);
  if (figEnd === -1) return [];

  const galleryHtml = html.slice(figStart, figEnd + 9);

  const images: string[] = [];
  const srcRe = /\bsrc="([^"]+)"/g;
  let m;
  while ((m = srcRe.exec(galleryHtml)) !== null) {
    images.push(toThumbnailUrl(m[1]));
  }
  return images.slice(0, 9);
}
