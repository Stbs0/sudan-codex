import { companiesTable, db } from "@sudan-codex/db";
import { eq, not } from "drizzle-orm";
import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sudancodex.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const companies = await db.query.companiesTable.findMany({
    columns: { slug: true, updatedAt: true, createdAt: true },
    where: not(eq(companiesTable.slug, "")),
  });

  return [
    {
      url: `${baseUrl}/companies`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...companies.map((company) => ({
      url: `${baseUrl}/companies/${company.slug}`,
      lastModified: company.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
