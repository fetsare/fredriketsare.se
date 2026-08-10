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
