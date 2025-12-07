import type { MetadataRoute } from "next";

import db from "@/db";

const getAllDrugs = async () => {
  return await db.query.drugsTable.findMany({ columns: { id: true } });
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const drugs = await getAllDrugs();

  const staticDate = "2025-12-01";

  const pages: MetadataRoute.Sitemap = [
    {
      url: "https://www.sudancodex.app",
      lastModified: staticDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.sudancodex.app/drug-list",
      lastModified: staticDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://www.sudancodex.app/privacy-policy",
      lastModified: staticDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.sudancodex.app/sign-up",
      lastModified: staticDate,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://www.sudancodex.app/log-in",
      lastModified: staticDate,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  return pages.concat(
    drugs.map((drug) => ({
      url: `https://www.sudancodex.app/drug-list/${drug.id}`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.8,
    }))
  );
}
