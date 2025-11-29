import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Column, PaginatedTable } from "@/components/ui/paginated-table";
import allDrugs from "@/data/drugData.json";
import agents from "@/data/stats/agents.json";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

function slugify(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function generateStaticParams() {
  return agents.map((agent) => ({
    slug: agent.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) {
    return { title: "Agent not found" };
  }
  const agent = agents.find((a) => a.slug === slug);
  if (!agent) {
    return { title: "Agent not found" };
  }
  return {
    title: `Stats for ${agent.name}`,
    description: `Detailed statistics for agent ${agent.name}, including associated companies and drugs.`,
  };
}

export default async function AgentStatsPage({ params }: Props) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }
  const agent = agents.find((a) => a.slug === slug);

  if (!agent) {
    notFound();
  }

  const agentDrugs = allDrugs
    .filter((drug) => drug.agentName === agent.name)
    .map((drug) => ({
      ...drug,
      brandSlug: slugify(drug.brandName),
      companySlug: slugify(drug.companyName),
    }));

  const associatedCompanies = [
    ...new Set(agentDrugs.map((drug) => drug.companyName)),
  ]
    .filter(Boolean)
    .map((name) => ({ name, slug: slugify(name) }));

  const nameAndSlugColumns: Column<{ name: string; slug: string }>[] = [
    {
      header: "Name",
      accessor: "name",
      isLink: true,
      slugAccessor: "slug",
    },
  ];

  const drugColumns: Column<(typeof agentDrugs)[number]>[] = [
    {
      header: "Brand Name",
      accessor: "brandName",
      isLink: true,
      basePath: "/stats/brand",
      slugAccessor: "brandSlug",
    },
    {
      header: "Company",
      accessor: "companyName",
      isLink: true,
      basePath: "/stats/company",
      slugAccessor: "companySlug",
    },
    { header: "Dosage Form", accessor: "dosageFormName" },
    { header: "Strength", accessor: "strength" },
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
              {agentDrugs.length.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Associated Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {associatedCompanies.length.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='space-y-8'>
        <Card>
          <CardHeader>
            <CardTitle>Associated Companies</CardTitle>
            <CardDescription>Companies this agent works with.</CardDescription>
          </CardHeader>
          <CardContent>
            <PaginatedTable
              items={associatedCompanies}
              columns={nameAndSlugColumns.map((c) => ({
                ...c,
                basePath: "/stats/company",
              }))}
              keyAccessor='slug'
              paginate={false}
            />
          </CardContent>
        </Card>

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
              keyAccessor='no'
              paginate={false}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
