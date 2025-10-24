import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const rules = [
    {
      userAgent: "*",
      allow: "/",
    },
  ];

  if (!SITE_URL) {
    return { rules };
  }

  return {
    rules,
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
