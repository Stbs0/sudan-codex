import { agentsTable, db } from "@sudan-codex/db";
import { eq, not } from "drizzle-orm";
import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sudancodex.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const agents = await db.query.agentsTable.findMany({
    columns: { slug: true, updatedAt: true, createdAt: true },
    where: not(eq(agentsTable.slug, "")),
  });

  return [
    {
      url: `${baseUrl}/agents`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...agents.map((agent) => {
      const lastModified = agent.updatedAt || agent.createdAt || new Date();
      return {
        url: `${baseUrl}/agents/${agent.slug}`,
        lastModified:
          lastModified instanceof Date && !isNaN(lastModified.getTime())
            ? lastModified
            : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    }),
  ];
}
