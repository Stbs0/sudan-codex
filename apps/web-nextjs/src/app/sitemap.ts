import type { MetadataRoute } from "next";

import { DrugWithSlugs } from "@/lib/types";
import fs from "fs/promises";
import path from "path";

const getAllDrugs = async (): Promise<DrugWithSlugs[]> => {
  const filePath = path.join(process.cwd(), "public/data/drugData.json");
  return JSON.parse(await fs.readFile(filePath, "utf8"));
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
      url: `https://www.sudancodex.app/drug-list/${drug.no}`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.8,
    }))
  );
}
