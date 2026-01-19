import { db, drugsTable } from "@sudan-codex/db";
import { eq, not } from "drizzle-orm";
import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sudancodex.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const drugs = await db.query.drugsTable.findMany({
    columns: { slug: true, updatedAt: true, createdAt: true },
    where: not(eq(drugsTable.slug, "")),
  });

  return [
    {
      url: `${baseUrl}/drug-list`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...drugs.map((drug) => ({
      url: `${baseUrl}/drug-list/${drug.slug}`,
      lastModified: new Date(
        drug.updatedAt ?? drug.createdAt ?? Date.now()
      ).toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
