import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Column, PaginatedTable } from "@/components/ui/paginated-table";
import {
  getAgentBySlug,
  getAgentBySlugWithStats,
  getAllAgents,
  getAllDrugsRelatedToAgentWithGenericAndCompanies,
} from "@/db/queries/agent";

import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const agent = await getAgentBySlug(slug);

  if (!agent) {
    return { title: "Agent not found" };
  }
  const description = `Explore detailed statistics for the pharmaceutical agent ${agent.name}. Discover the total number of drugs they represent, associated companies, and the variety of generic names in their portfolio. View a comprehensive list of all brand names represented by this agent, filterable and sortable for your convenience. This page is an essential resource for anyone interested in the activities of specific pharmaceutical agents within Sudan.`;

  return {
    title: `Statistics for Agent ${agent.name} in Sudan`,
    description: description,
    keywords: [
      agent.name,
      "pharmaceutical agent",
      "drug representative",
      "Sudan drug statistics",
      "drug portfolio",
      "Sudan Drug Index",
    ],
    openGraph: {
      title: `Statistics for Agent: ${agent.name}`,
      description: `Detailed statistics for agent ${agent.name}, including associated companies and drugs.`,
      url: `https://www.sudan-codex.com/stats/agents/${slug}`,
      siteName: "Sudan Codex",
      images: [
        {
          url: "/opengraph-image.jpg",
          width: 1200,
          height: 630,
          alt: `Statistics for Agent: ${agent.name}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Statistics for Agent: ${agent.name}`,
      description: `Detailed statistics for agent ${agent.name}, including associated companies and drugs.`,
      images: ["/opengraph-image.jpg"],
    },
  };
}

export default async function AgentStatsPage({ params }: Props) {
  const { slug } = await params;

  const agent = await getAgentBySlugWithStats(slug);

  if (!agent) {
    notFound();
  }

  const agentDrugsData = await getAllDrugsRelatedToAgentWithGenericAndCompanies(
    agent.id
  );

  const agentDrugs = agentDrugsData.map((drug) => ({
    ...drug,
    genericName: drug.generic?.name,
    genericSlug: drug.generic?.slug,
    companyName: drug.company?.name,
    companySlug: drug.company?.slug,
  }));

  const drugColumns: Column<(typeof agentDrugs)[number]>[] = [
    {
      header: "Brand Name",
      accessor: "brand_name",
      isLink: true,
      basePath: "/drug-list/",
      slugAccessor: "slug",
    },
    {
      header: "Generic",
      accessor: "genericName",
      isLink: true,
      basePath: "/stats/generics/",
      slugAccessor: "genericSlug",
    },
    { header: "Dosage Form", accessor: "dosage_form" },
    { header: "Strength", accessor: "strength" },
    {
      header: "Company",
      accessor: "companyName",
      isLink: true,
      basePath: "/stats/companies/",
      slugAccessor: "companySlug",
    },
  ];

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-2 text-3xl font-bold'>{agent.name}</h1>
      <p className='text-muted-foreground mb-6 text-lg'>Agent Statistics</p>

      <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Total Drugs Represented</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {agent.stats?.total_brands?.toLocaleString() ?? 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Associated Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {agent.stats?.related_companies?.toLocaleString() ?? 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Associated Generics Name</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {agent.stats?.related_generics?.toLocaleString() ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='space-y-8'>
        <Card>
          <CardHeader>
            <CardTitle>Drugs Represented</CardTitle>
            <CardDescription>
              All brand names represented by this agent.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaginatedTable
              items={agentDrugs}
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
