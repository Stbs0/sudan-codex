import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Column, PaginatedTable } from "@/components/ui/paginated-table";
import db from "@/db";
import { companiesTable, drugsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const companies = await db
    .select({ slug: companiesTable.slug })
    .from(companiesTable);
  return companies.filter((c) => c.slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = await db.query.companiesTable.findFirst({
    where: eq(companiesTable.slug, slug),
  });

  if (!company) {
    return {
      title: "Company not found",
    };
  }
  return {
    title: `Stats for ${company.name}`,
    description: `Detailed statistics for ${company.name}, including brands, generic names, and associated agents.`,
  };
}

export default async function CompanyStatsPage({ params }: Props) {
  const { slug } = await params;

  const company = await db.query.companiesTable.findFirst({
    where: eq(companiesTable.slug, slug),
    with: {
      stats: true,
    },
  });

  if (!company) {
    notFound();
  }

  const companyDrugsData = await db.query.drugsTable.findMany({
    where: eq(drugsTable.company_id, company.id),
    with: {
      generic: {
        columns: {
          name: true,
          slug: true,
        },
      },
      agent: {
        columns: {
          name: true,
          slug: true,
        },
      },
    },
  });

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
      basePath: "/stats/generic/",
      slugAccessor: "genericSlug",
    },
    { header: "Dosage Form", accessor: "dosage_form" },
    { header: "Strength", accessor: "strength" },
    {
      header: "Agent Name",
      accessor: "agentName",
      isLink: true,
      basePath: "/stats/agent/",
      slugAccessor: "agentSlug",
    },
  ];

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-2 text-3xl font-bold'>{company.name}</h1>
      <p className='text-muted-foreground mb-6 text-lg'>Statistics</p>

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
      </div>

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
              paginate={false}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
