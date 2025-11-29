import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import allDrugs from "@/data/drugData.json";
import brands from "@/data/stats/brands.json";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return brands.map((brand) => ({
    slug: brand.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) {
    return { title: "Brand not found" };
  }
  return {
    title: `Info for ${brand.name}`,
    description: `Detailed information for the brand name drug ${brand.name}.`,
  };
}

export default async function BrandNameStatsPage({ params }: Props) {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) {
    notFound();
  }

  const brandDrugs = allDrugs.filter((drug) => drug.brandName === brand.name);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-2 text-3xl font-bold'>{brand.name}</h1>
      <p className='text-muted-foreground mb-6 text-lg'>
        Brand Name Information
      </p>

      <div className='space-y-8'>
        {brandDrugs.map((drug) => (
          <Card key={drug.no}>
            <CardHeader>
              <CardTitle>{drug.brandName}</CardTitle>
              <CardDescription>
                Manufactured by{" "}
                <Link
                  href={`/stats/company/${slugify(drug.companyName)}`}
                  className='text-primary font-semibold hover:underline'>
                  {drug.companyName}
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <div>
                <h3 className='mb-2 font-semibold'>Generic Name</h3>
                <Link href={`/stats/generic/${slugify(drug.genericName)}`}>
                  <Badge variant='outline'>{drug.genericName}</Badge>
                </Link>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h3 className='font-semibold'>Dosage Form</h3>
                  <p>{drug.dosageFormName}</p>
                </div>
                <div>
                  <h3 className='font-semibold'>Strength</h3>
                  <p>{drug.strength}</p>
                </div>
                <div>
                  <h3 className='font-semibold'>Pack Size</h3>
                  <p>{drug.packSize}</p>
                </div>
                <div>
                  <h3 className='font-semibold'>Agent</h3>
                  {drug.agentName ? (
                    <Link href={`/stats/agent/${slugify(drug.agentName)}`}>
                      <Badge variant='secondary'>{drug.agentName}</Badge>
                    </Link>
                  ) : (
                    <Badge variant='secondary'>N/A</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

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
