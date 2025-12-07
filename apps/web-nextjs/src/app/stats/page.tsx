import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db";
import {
  agentsTable,
  agentStatsTable,
  companiesTable,
  companyStatsTable,
  drugsTable,
  genericsTable,
  genericStatsTable,
} from "@/db/schema";
import { count, countDistinct, desc, eq, sql } from "drizzle-orm";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = false; // Revalidate every hour

export const metadata: Metadata = {
  title: "Sudan Drug Index Statistics",
  description:
    "Explore comprehensive statistics about the Sudan Drug Index. Discover insights into the total number of drugs, unique companies, brand names, generic names, and agents. View top-ranking companies, agents, and generics based on the number of associated drugs. Ideal for researchers, healthcare professionals, and anyone interested in the pharmaceutical landscape of Sudan.",
  keywords: [
    "Sudan Drug Index",
    "drug statistics",
    "pharmaceutical data",
    "drug companies Sudan",
    "drug agents Sudan",
    "generic drugs Sudan",
  ],
  openGraph: {
    title: "Sudan Drug Index Statistics",
    description:
      "Comprehensive statistics on the Sudan Drug Index, including top companies, agents, and generics.",
    url: "https://www.sudan-codex.com/stats",
    siteName: "Sudan Codex",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sudan Drug Index Statistics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sudan Drug Index Statistics",
    description:
      "Comprehensive statistics on the Sudan Drug Index, including top companies, agents, and generics.",
    images: ["/opengraph-image.jpg"],
  },
};

export default async function StatsPage() {
  const [
    summaryDataArray,
    topCompanies,
    topAgents,
    topGenerics,
    topBrands,
    agentsWithCompanyCount,
    companiesWithAgentCount,
  ] = await Promise.all([
    // --- Summary Data ---
    db
      .select({
        totalDrugs: count(drugsTable.id),
        totalCompanies: countDistinct(drugsTable.company_id),
        totalBrandNames: countDistinct(drugsTable.brand_name),
        totalGenerics: countDistinct(drugsTable.generic_id),
        totalAgents: countDistinct(drugsTable.agent_id),
      })
      .from(drugsTable),

    // --- Top Companies by Brand Count ---
    db
      .select({
        name: companiesTable.name,
        slug: companiesTable.slug,
        count: companyStatsTable.total_brands,
      })
      .from(companyStatsTable)
      .leftJoin(
        companiesTable,
        eq(companyStatsTable.company_id, companiesTable.id)
      )
      .orderBy(desc(companyStatsTable.total_brands))
      .limit(10),

    // --- Top Agents by Drug Count ---
    db
      .select({
        name: agentsTable.name,
        slug: agentsTable.slug,
        count: agentStatsTable.total_brands,
      })
      .from(agentStatsTable)
      .leftJoin(agentsTable, eq(agentStatsTable.agent_id, agentsTable.id))
      .orderBy(desc(agentStatsTable.total_brands))
      .limit(10),

    // --- Top Generics by Drug Count ---
    db
      .select({
        name: genericsTable.name,
        slug: genericsTable.slug,
        count: genericStatsTable.total_brands,
      })
      .from(genericStatsTable)
      .leftJoin(
        genericsTable,
        eq(genericStatsTable.generic_id, genericsTable.id)
      )
      .orderBy(desc(genericStatsTable.total_brands))
      .limit(10),

    // --- Most Frequent Brand Names ---
    db
      .select({
        name: drugsTable.brand_name,
        slug: sql<string>`min(${drugsTable.slug})`.as("slug"),
        count: sql<number>`count(${drugsTable.id})`.as("count"),
      })
      .from(drugsTable)
      .groupBy(drugsTable.brand_name)
      .orderBy(desc(sql`count(${drugsTable.id})`))
      .limit(10),

    // --- Agents and their Associated Companies ---
    db
      .select({
        name: agentsTable.name,
        slug: agentsTable.slug,
        count: agentStatsTable.related_companies,
      })
      .from(agentStatsTable)
      .leftJoin(agentsTable, eq(agentStatsTable.agent_id, agentsTable.id))
      .orderBy(desc(agentStatsTable.related_companies))
      .limit(10),

    // --- Companies and their Associated Agents ---
    db
      .select({
        name: companiesTable.name,
        slug: companiesTable.slug,
        count: companyStatsTable.related_agents,
      })
      .from(companyStatsTable)
      .leftJoin(
        companiesTable,
        eq(companyStatsTable.company_id, companiesTable.id)
      )
      .orderBy(desc(companyStatsTable.related_agents))
      .limit(10),
  ]);
  const summaryData = summaryDataArray[0];
  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-4 text-3xl font-bold'>Drug Statistics</h1>

      <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>Total Drugs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {summaryData.totalDrugs.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unique Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {summaryData.totalCompanies.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unique Brand Names</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {summaryData.totalBrandNames.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unique Generic Names</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {summaryData.totalGenerics.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unique Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {summaryData.totalAgents.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Top Companies by Brand Names</CardTitle>
            <CardDescription>
              Companies with the most brand names.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className='bg-secondary'>
                  <TableHead>Company</TableHead>
                  <TableHead className='text-right'>Brand Names</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCompanies.map((company) => (
                  <TableRow key={company.slug}>
                    <TableCell>
                      <Link
                        href={`/stats/companies/${company.slug}`}
                        className='hover:underline'>
                        {company.name}
                      </Link>
                    </TableCell>
                    <TableCell className='text-right'>
                      {company.count}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Agents by Drug Count</CardTitle>
            <CardDescription>
              Agents associated with the most drugs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className='bg-secondary'>
                  <TableHead>Agent</TableHead>
                  <TableHead className='text-right'>Drugs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topAgents.map((agent) => (
                  <TableRow key={agent.slug}>
                    <TableCell>
                      {agent.name ? (
                        <Link
                          href={`/stats/agents/${agent.slug}`}
                          className='hover:underline'>
                          {agent.name}
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className='text-right'>{agent.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Generic Names by Drug Count</CardTitle>
            <CardDescription>
              Generic names associated with the most drugs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className='bg-secondary'>
                  <TableHead>Generic Name</TableHead>
                  <TableHead className='text-right'>Drugs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topGenerics.map((generic) => (
                  <TableRow key={generic.slug}>
                    <TableCell>
                      {generic.name ? (
                        <Link
                          href={`/stats/generics/${generic.slug}`}
                          className='hover:underline'>
                          {generic.name}
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className='text-right'>
                      {generic.count}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Most Frequent Brand Names</CardTitle>
            <CardDescription>
              Brand names that appear most frequently.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className='bg-secondary'>
                  <TableHead>Brand Name</TableHead>
                  <TableHead className='text-right'>Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topBrands.map((brand) => (
                  <TableRow key={brand.slug}>
                    <TableCell>
                      {brand.name ? (
                        <Link
                          href={`/drug-list/${brand.slug}`}
                          className='hover:underline'>
                          {brand.name}
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className='text-right'>{brand.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Top Agents by Associated Companies</CardTitle>
            <CardDescription>
              Agents who work with the most companies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className='bg-secondary'>
                  <TableHead>Agent</TableHead>
                  <TableHead className='text-right'>Companies</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agentsWithCompanyCount.map((agent) => (
                  <TableRow key={agent.slug}>
                    <TableCell>
                      {agent.name ? (
                        <Link
                          href={`/stats/agents/${agent.slug}`}
                          className='hover:underline'>
                          {agent.name}
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className='text-right'>{agent.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Companies by Associated Agents</CardTitle>
            <CardDescription>
              Companies who work with the most agents.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className='bg-secondary'>
                  <TableHead>Company</TableHead>
                  <TableHead className='text-right'>Agents</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companiesWithAgentCount.map((company) => (
                  <TableRow key={company.slug}>
                    <TableCell>
                      {company.name ? (
                        <Link
                          href={`/stats/companies/${company.slug}`}
                          className='hover:underline'>
                          {company.name}
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className='text-right'>
                      {company.count}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
