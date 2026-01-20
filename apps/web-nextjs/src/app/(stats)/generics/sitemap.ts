import { db, genericsTable } from "@sudan-codex/db";
import { eq, not } from "drizzle-orm";
import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sudancodex.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const generics = await db.query.genericsTable.findMany({
    columns: { slug: true, updatedAt: true, createdAt: true },
    where: not(eq(genericsTable.slug, "")),
  });

  return [
    {
      url: `${baseUrl}/generics`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...generics.map((generic) => ({
      url: `${baseUrl}/generics/${generic.slug}`,
      lastModified: generic.updatedAt.toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
