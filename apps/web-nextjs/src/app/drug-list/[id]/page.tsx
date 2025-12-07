import { DrugDescriptions } from "@/components/drugInfo/drug-descriptions";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BackBtn from "@/components/drugInfo/back-btn";
import DrugInfoC from "@/components/drugInfo/drug-info";
import { generateDrugJsonLd } from "@/lib/json-ld";
import { getDrugById } from "@/services/server/getDrugs";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const drug = await getDrugById(Number(id));

  if (!drug) {
    return {
      title: "Drug Not Found | Drug Directory",
      description: "The requested drug could not be found in our database.",
      alternates: {
        canonical: `/drug-list/${id}`,
      },
      robots: "noindex",
    };
  }

  const { brand_name, generic_name, agent_name, company_name, country_name } =
    drug;

  return {
    title: `${brand_name} – Full Drug Information & Details`,
    description: `${brand_name} (${generic_name}) from ${company_name}. Imported by ${agent_name}. Origin: ${country_name}. View full drug details, strengths, and indications.`,
    alternates: {
      canonical: `/drug-list/${id}`,
    },
    openGraph: {
      title: `${brand_name} – Drug Details`,
      description: `${brand_name} (${generic_name}) complete information including company, agent, and origin.`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${brand_name} – Drug Details`,
      description: `${brand_name} (${generic_name}) full drug information.`,
    },
  };
}
export default async function DrugInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const drug = await getDrugById(Number(id));

  if (!drug) notFound();

  const jsonLd = generateDrugJsonLd(drug);

  return (
    <div className='container mx-auto max-w-5xl px-4 py-6'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className='mb-6 flex items-center gap-3'>
        <BackBtn />
        <h1 className='text-xl font-semibold tracking-tight'>
          {drug.brand_name}
        </h1>
      </div>

      <Card className='flex flex-col gap-6 p-6'>
        <DrugDescriptions drug={drug} />
        <Separator />
        <CardContent className='flex w-full flex-col gap-4 p-0'>
          <DrugInfoC />
        </CardContent>
      </Card>
    </div>
  );
}
