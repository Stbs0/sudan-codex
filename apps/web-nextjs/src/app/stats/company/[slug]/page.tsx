import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Column, PaginatedTable } from "@/components/ui/paginated-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import companies from "@/data/stats/companies.json";
import { getAllDrugs } from "@/services/server/getDrugs";
import { Metadata, Route } from "next";
import Link from "next/link";
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
  const allDrugs = await getAllDrugs();

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

  const nameAndSlugColumns: Column<{ name: string; slug: string }>[] = [
    {
      header: "Name",
      accessor: "name",
      isLink: true,
      slugAccessor: "slug",
    },
  ];

  const drugColumns: Column<(typeof allDrugs)[number]>[] = [
    {
      header: "Brand Name",
      accessor: "brandName",
      isLink: true,
      basePath: "/drug-list/",
      slugAccessor: "no",
    },
    {
      header: "Generic Name",
      accessor: "genericName",
      isLink: true,
      basePath: "/stats/generic",
      slugAccessor: "genericName",
    },
    { header: "Dosage Form", accessor: "dosageFormName" },
    { header: "Strength", accessor: "strength" },
    {
      header: "Agent Name",
      accessor: "agentName",
      isLink: true,
      basePath: "/stats/agent",
      slugAccessor: "agentName",
    },
  ];

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
            <CardTitle>Drug Products</CardTitle>
            <CardDescription>
              All drug products from this company.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaginatedTable
              items={companyDrugs}
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
