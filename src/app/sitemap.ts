import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bellabona.com";

// Static sitemap for the test (single page).
// In the full project, this would dynamically fetch all page slugs from Sanity
// and output one entry per locale: /en/..., /de/...
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
