import { getDrugs } from "@/services/server/getDrugs";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const drugs = await getDrugs();
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const pages: MetadataRoute.Sitemap = [
    {
      url: "https://www.sudancodex.app",
      lastModified: today,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.sudancodex.app/drug-list",
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://www.sudancodex.app/privacy-policy",
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.sudancodex.app/sign-up",
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://www.sudancodex.app/log-in",
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  return pages.concat(
    drugs.map((drug) => ({
      url: `https://www.sudancodex.app/drug-list/${drug.no}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    }))
  );
}
