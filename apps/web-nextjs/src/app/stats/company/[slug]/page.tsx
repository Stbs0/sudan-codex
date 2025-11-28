import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaginatedTable } from "@/components/ui/paginated-table";
import allDrugs from "@/data/drugData.json";
import companies from "@/data/stats/companies.json";
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
  return companies.map((company) => ({
    slug: company.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const company = companies.find((c) => c.slug === slug);
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

  const company = companies.find((c) => c.slug === slug);

  if (!company) {
    notFound();
  }

  const companyDrugs = allDrugs.filter(
    (drug) => drug.companyName === company.name
  );

  const brandNames = [...new Set(companyDrugs.map((drug) => drug.brandName))]
    .filter(Boolean)
    .map((name) => ({ name, slug: slugify(name) }));

  const genericNames = [
    ...new Set(companyDrugs.map((drug) => drug.genericName)),
  ]
    .filter(Boolean)
    .map((name) => ({ name, slug: slugify(name) }));

  const agents = [...new Set(companyDrugs.map((drug) => drug.agentName))]
    .filter(Boolean)
    .map((name) => ({ name, slug: slugify(name) }));

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-2 text-3xl font-bold'>{company.name}</h1>
      <p className='text-muted-foreground mb-6 text-lg'>Statistics</p>

      <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>Total Drugs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {companyDrugs.length.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unique Brand Names</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {brandNames.length.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unique Generic Names</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {genericNames.length.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='space-y-8'>
        <Card>
          <CardHeader>
            <CardTitle>Associated Agents</CardTitle>
            <CardDescription>
              Agents who are associated with this company.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaginatedTable
              items={agents}
              basePath='/stats/agent'
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Brand Names</CardTitle>
            <CardDescription>
              All brand names from this company.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaginatedTable
              items={brandNames}
              basePath='/stats/brand'
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generic Names</CardTitle>
            <CardDescription>
              All generic names produced by this company.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaginatedTable
              items={genericNames}
              basePath='/stats/generic'
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
