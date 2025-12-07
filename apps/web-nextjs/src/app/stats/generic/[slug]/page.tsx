import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Column, PaginatedTable } from "@/components/ui/paginated-table";
import db from "@/db";
import { drugsTable, genericsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const generics = await db
    .select({ slug: genericsTable.slug })
    .from(genericsTable);
  return generics.filter((g) => g.slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const generic = await db.query.genericsTable.findFirst({
    where: eq(genericsTable.slug, slug),
  });

  if (!generic) {
    return { title: "Generic name not found" };
  }
  return {
    title: `Stats for ${generic.name}`,
    description: `Detailed statistics for generic name ${generic.name}, including associated companies and brand names.`,
  };
}

export default async function GenericNameStatsPage({ params }: Props) {
  const { slug } = await params;

  const generic = await db.query.genericsTable.findFirst({
    where: eq(genericsTable.slug, slug),
    with: {
      stats: true,
    },
  });

  if (!generic) {
    notFound();
  }

  const genericDrugsData = await db.query.drugsTable.findMany({
    where: eq(drugsTable.generic_id, generic.id),
    with: {
      company: {
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

  const genericDrugs = genericDrugsData.map((drug) => ({
    ...drug,
    companyName: drug.company?.name,
    companySlug: drug.company?.slug,
    agentName: drug.agent?.name,
    agentSlug: drug.agent?.slug,
  }));

  const drugColumns: Column<(typeof genericDrugs)[number]>[] = [
    {
      header: "Brand Name",
      accessor: "brand_name",
      isLink: true,
      basePath: "/drug-list/",
      slugAccessor: "slug",
    },
    { header: "Dosage Form", accessor: "dosage_form" },
    { header: "Strength", accessor: "strength" },
    {
      header: "Company",
      accessor: "companyName",
      isLink: true,
      basePath: "/stats/company/",
      slugAccessor: "companySlug",
    },
    {
      header: "Agent",
      accessor: "agentName",
      isLink: true,
      basePath: "/stats/agent/",
      slugAccessor: "agentSlug",
    },
  ];

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-2 text-3xl font-bold'>{generic.name}</h1>
      <p className='text-muted-foreground mb-6 text-lg'>
        Generic Name Statistics
      </p>

      <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Total Drug Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {generic.stats?.total_brands?.toLocaleString() ?? 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unique Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {generic.stats?.related_companies?.toLocaleString() ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='space-y-8'>
        <Card>
          <CardHeader>
            <CardTitle>Drug Products</CardTitle>
            <CardDescription>
              All drug products with this generic name.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaginatedTable
              items={genericDrugs}
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
