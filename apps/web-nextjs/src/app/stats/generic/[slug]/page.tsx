import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaginatedTable } from "@/components/ui/paginated-table";
import allDrugs from "@/data/drugData.json";
import generics from "@/data/stats/generics.json";
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
  return generics.map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const generic = generics.find((g) => g.slug === slug);
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

  const generic = generics.find((g) => g.slug === slug);
  if (!generic) {
    notFound();
  }

  const genericDrugs = allDrugs.filter(
    (drug) => drug.genericName === generic.name
  );

  const associatedCompanies = [
    ...new Set(genericDrugs.map((drug) => drug.companyName)),
  ]
    .filter(Boolean)
    .map((name) => ({ name, slug: slugify(name) }));

  const associatedBrandNames = [
    ...new Set(genericDrugs.map((drug) => drug.brandName)),
  ]
    .filter(Boolean)
    .map((name) => ({ name, slug: slugify(name) }));

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
              {genericDrugs.length.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unique Brand Names</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {associatedBrandNames.length.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='space-y-8'>
        <Card>
          <CardHeader>
            <CardTitle>Associated Companies</CardTitle>
            <CardDescription>
              Companies that produce drugs with this generic name.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaginatedTable
              items={associatedCompanies}
              basePath='/stats/company'
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Associated Brand Names</CardTitle>
            <CardDescription>
              Brand names associated with this generic name.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaginatedTable
              items={associatedBrandNames}
              basePath='/stats/brand'
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
