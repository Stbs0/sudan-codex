import { NextResponse } from "next/server";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sudancodex.app";

/**
 * Generates a sitemap index XML that references all sub-sitemaps.
 * This allows Google to properly discover and crawl all sub-sitemaps.
 */
export function GET(): NextResponse {
  const lastmod = "2026-02-04";

  const sitemaps = [
    { loc: `${baseUrl}/drug-list/sitemap.xml`, lastmod },
    { loc: `${baseUrl}/agents/sitemap.xml`, lastmod },
    { loc: `${baseUrl}/companies/sitemap.xml`, lastmod },
    { loc: `${baseUrl}/generics/sitemap.xml`, lastmod },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (sitemap) => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
