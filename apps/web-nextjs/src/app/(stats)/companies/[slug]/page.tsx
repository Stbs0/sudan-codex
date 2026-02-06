import {
  getAllDrugsRelatedToCompanyWithGenericAndAgents,
  getCompanyBySlug,
  getCompanyBySlugWithStats,
} from "@sudan-codex/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import ViewCount from "@/components/drugInfo/view-count";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Column, PaginatedTable } from "@/components/ui/paginated-table";
import { generateCompanyJsonLd } from "@/lib/json-ld";

type Props = {
  params: Promise<{ slug: string }>;
};
export const revalidate = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);

  if (!company) {
    return {
      title: "Company not found",
    };
  }

  const description = `Explore detailed statistics for ${company.name}, a key player in Sudan's pharmaceutical landscape. Discover the total number of drugs they offer, the variety of unique generic names in their portfolio, and the agents who represent them. You can also browse a comprehensive, sortable list of all drug products from this company. This page is an essential resource for anyone interested in the activities and product offerings of specific pharmaceutical companies in Sudan.`;

  return {
    title: `${company.name} | Pharmaceutical Company in Sudan | Sudan Codex`,
    description: description,
    alternates: {
      canonical: `/companies/${slug}`,
    },
    keywords: [
      company.name,
      "pharmaceutical company in Sudan",
      "drug manufacturer",
      "Sudan drug statistics",
      "drug products",
      "Sudan Drug Index",
    ],
    openGraph: {
      title: `Statistics for Company ${company.name} in Sudan`,
      description: `Detailed statistics for ${company.name}, including brands, generic names, and associated agents.`,
      url: `https://www.sudan-codex.com/companies/${slug}`,
      siteName: "Sudan Codex",
      images: [
        {
          url: "/opengraph-image.jpg",
          width: 1200,
          height: 630,
          alt: `Statistics for Company: ${company.name}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Statistics for Company: ${company.name}`,
      description: `Detailed statistics for ${company.name}, including brands, generic names, and associated agents.`,
      images: ["/opengraph-image.jpg"],
    },
  };
}

export default async function CompanyStatsPage({ params }: Props) {
  const { slug } = await params;

  const company = await getCompanyBySlugWithStats(slug);

  if (!company) {
    notFound();
  }

  const companyDrugsData =
    await getAllDrugsRelatedToCompanyWithGenericAndAgents(company.id);

  const companyDrugs = companyDrugsData.map((drug) => ({
    ...drug,
    genericName: drug.generic?.name,
    genericSlug: drug.generic?.slug,
    agentName: drug.agent?.name,
    agentSlug: drug.agent?.slug,
  }));

  const drugColumns: Column<(typeof companyDrugs)[number]>[] = [
    {
      header: "Brand Name",
      accessor: "brand_name",
      isLink: true,
      basePath: "/drug-list/",
      slugAccessor: "slug",
    },
    {
      header: "Generic Name",
      accessor: "genericName",
      isLink: true,
      basePath: "/generics/",
      slugAccessor: "genericSlug",
    },
    { header: "Dosage Form", accessor: "dosage_form" },
    { header: "Strength", accessor: "strength" },
    {
      header: "Agent Name",
      accessor: "agentName",
      isLink: true,
      basePath: "/agents/",
      slugAccessor: "agentSlug",
    },
  ];

  return (
    <div className='container mx-auto p-4'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateCompanyJsonLd(company)).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      <h1 className='mb-2 text-3xl font-bold'>{company.name}</h1>
      <p className='text-muted-foreground mb-6 text-lg'>Company Statistics</p>

      <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Total Drugs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {company.stats?.total_brands?.toLocaleString() ?? 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unique Generic Names</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {company.stats?.related_generics?.toLocaleString() ?? 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unique Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {company.stats?.related_agents?.toLocaleString() ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>
      <ViewCount
        id={company.id}
        createdAt={company.createdAt}
        updatedAt={company.updatedAt}
        entity='companies'
        slug={company.slug}
      />
      <div className='space-y-8'>
        <Card>
          <CardHeader>
            <CardTitle>Drug Products</CardTitle>
            <CardDescription>
              All drug products from this company.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaginatedTable
              items={companyDrugs}
              columns={drugColumns}
              keyAccessor='id'
              paginate={true}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
