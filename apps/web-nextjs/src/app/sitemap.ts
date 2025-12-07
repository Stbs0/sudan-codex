import type { MetadataRoute } from "next";

import db from "@/db";

const getAllDrugs = async () => {
  return await db.query.drugsTable.findMany({ columns: { slug: true } });
};
const getAllAgents = async () => {
  return await db.query.agentsTable.findMany({ columns: { slug: true } });
};
const getAllCompanies = async () => {
  return await db.query.companiesTable.findMany({ columns: { slug: true } });
};
const getAllGenerics = async () => {
  return await db.query.genericsTable.findMany({ columns: { slug: true } });
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [agents, companies, generics, drugs] = await Promise.all([
    getAllAgents(),
    getAllCompanies(),
    getAllGenerics(),
    getAllDrugs(),
  ]);

  const staticDate = "2025-12-6";

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
      url: "https://www.sudancodex.app/stats",
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.8,
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
      url: `https://www.sudancodex.app/drug-list/${drug.slug}`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    agents.map((agent) => ({
      url: `https://www.sudancodex.app/agents/${agent.slug}`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    companies.map((company) => ({
      url: `https://www.sudancodex.app/companies/${company.slug}`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    generics.map((generic) => ({
      url: `https://www.sudancodex.app/agents/${generic.slug}`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.8,
    }))
  );
}
