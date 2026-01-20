import ViewCount from "@/components/drugInfo/view-count";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Column, PaginatedTable } from "@/components/ui/paginated-table";
import { generateGenericJsonLd } from "@/lib/json-ld";
import {
  getAllDrugsRelatedToGenericWithAgentsAndCompanies,
  getGenericBySlugWithStats,
} from "@sudan-codex/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
export const revalidate = false;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const generic = await getGenericBySlugWithStats(slug);

  if (!generic) {
    return { title: "Generic name not found" };
  }
  const description = `Explore detailed statistics for the generic name ${generic.name}. Discover the total number of drug entries, unique companies that manufacture it, and the agents who represent it. You can also browse a comprehensive, sortable list of all drug products with this generic name. This page is an essential resource for anyone interested in the availability and distribution of specific generic drugs in Sudan.`;
  return {
    title: `${generic.name} | Generic Drug Statistics in Sudan | Sudan Codex`,
    description,
    alternates: {
      canonical: `/generics/${slug}`,
    },
    keywords: [
      generic.name,
      "generic drug in sudan",
      "drug active ingredient",
      "Sudan drug statistics",
      "drug products",
      "Sudan Drug Index",
    ],
    openGraph: {
      title: `Statistics for Generic: ${generic.name}`,
      description: `Detailed statistics for generic name ${generic.name}, including associated companies and brand names.`,
      url: `https://www.sudan-codex.com/generics/${slug}`,
      siteName: "Sudan Codex",
      images: [
        {
          url: "/opengraph-image.jpg",
          width: 1200,
          height: 630,
          alt: `Statistics for Generic: ${generic.name}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Statistics for Generic: ${generic.name}`,
      description: `Detailed statistics for generic name ${generic.name}, including associated companies and brand names.`,
      images: ["/opengraph-image.jpg"],
    },
  };
}

export default async function GenericNameStatsPage({ params }: Props) {
  const { slug } = await params;

  const generic = await getGenericBySlugWithStats(slug);

  if (!generic) {
    notFound();
  }

  const genericDrugsData =
    await getAllDrugsRelatedToGenericWithAgentsAndCompanies(generic.id);

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
      basePath: "/companies/",
      slugAccessor: "companySlug",
    },
    {
      header: "Agent",
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
          __html: JSON.stringify(generateGenericJsonLd(generic)).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      <h1 className='mb-2 text-3xl font-bold'>{`${generic.name} – Generic Drug Information & Statistics in Sudan`}</h1>
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
        <Card>
          <CardHeader>
            <CardTitle>Unique Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {generic.stats?.related_agents?.toLocaleString() ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>
      <ViewCount
        id={generic.id}
        createdAt={generic.createdAt}
        entity='generics'
        updatedAt={generic.updatedAt}
        slug={generic.slug}
      />
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
              paginate={true}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
