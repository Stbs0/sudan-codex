import type { MetadataRoute } from "next";

import {
  db,
  getAllAgents,
  getAllCompanies,
  getAllGenericSlugs,
} from "@sudan-codex/db";

const getAllDrugs = async () => {
  return await db.query.drugsTable.findMany({ columns: { slug: true } });
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [agents, companies, generics, drugs] = await Promise.all([
    getAllAgents(),
    getAllCompanies(),
    getAllGenericSlugs(),
    getAllDrugs(),
  ]);

  const NEWLY_MODIFIED = "2025-12-16";
  const TRULY_STATIC_DATE = "2025-12-06";

  const pages: MetadataRoute.Sitemap = [
    {
      url: "https://www.sudancodex.app",
      lastModified: TRULY_STATIC_DATE,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.sudancodex.app/drug-list",
      lastModified: NEWLY_MODIFIED,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://www.sudancodex.app/privacy-policy",
      lastModified: TRULY_STATIC_DATE,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.sudancodex.app/stats",
      lastModified: NEWLY_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.sudancodex.app/sign-up",
      lastModified: TRULY_STATIC_DATE,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://www.sudancodex.app/log-in",
      lastModified: TRULY_STATIC_DATE,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  return pages.concat(
    drugs.map((drug) => ({
      url: `https://www.sudancodex.app/drug-list/${drug.slug}`,
      lastModified: NEWLY_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    agents.map((agent) => ({
      url: `https://www.sudancodex.app/agents/${agent.slug}`,
      lastModified: NEWLY_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    companies.map((company) => ({
      url: `https://www.sudancodex.app/companies/${company.slug}`,
      lastModified: NEWLY_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    generics.map((generic) => ({
      url: `https://www.sudancodex.app/generics/${generic.slug}`,
      lastModified: NEWLY_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    }))
  );
}
