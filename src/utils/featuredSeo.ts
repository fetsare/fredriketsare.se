type FeaturedConfig =
  | boolean
  | {
      slug?: string;
      seoTitle?: string;
      seoDescription?: string;
    }
  | undefined;

interface ResolveFeaturedSeoInput {
  title: string;
  body?: string;
  featured: FeaturedConfig;
  siteTitle: string;
  fallbackDescription: string;
}

interface ResolveFeaturedSeoResult {
  slug: string;
  seoTitle: string;
  seoDescription: string;
}

export function isFeatured(featured: FeaturedConfig): boolean {
  return featured === true || typeof featured === "object";
}

export function toSeoSlug(input: string): string {
  const normalized = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return normalized || "post";
}

export function getUniqueSlug(baseSlug: string, usedSlugs: Set<string>): string {
  let slug = baseSlug;
  let counter = 2;

  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  usedSlugs.add(slug);
  return slug;
}

export function resolveFeaturedSeo(input: ResolveFeaturedSeoInput): ResolveFeaturedSeoResult {
  const { title, body, featured, siteTitle, fallbackDescription } = input;
  const featuredObject = typeof featured === "object" ? featured : undefined;

  const slug = featuredObject?.slug ? toSeoSlug(featuredObject.slug) : toSeoSlug(title);
  const seoTitle = featuredObject?.seoTitle?.trim() || `${title} | ${siteTitle}`;
  const seoDescription =
    featuredObject?.seoDescription?.trim() || extractDescription(body) || fallbackDescription;

  return {
    slug,
    seoTitle,
    seoDescription,
  };
}

function extractDescription(markdownBody: string | undefined, maxLength = 160): string {
  if (!markdownBody) {
    return "";
  }

  const plain = markdownBody
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!?\[[^\]]*\]\([^\)]*\)/g, " ")
    .replace(/#+\s+/g, " ")
    .replace(/[>*_~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!plain) {
    return "";
  }

  if (plain.length <= maxLength) {
    return plain;
  }

  const cut = plain.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim()}...`;
}
