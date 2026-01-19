import type { MetadataRoute } from "next";

/**
 * Generates the main sitemap for Sudan Codex.
 * @returns {MetadataRoute.Sitemap} The sitemap configuration.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sudancodex.app";

  return [
    {
      url: `${baseUrl}/drug-list/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/agents/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/companies/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/generics/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
