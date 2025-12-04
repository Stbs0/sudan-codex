import { DrugDescriptions } from "@/components/drugInfo/drug-descriptions";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BackBtn from "@/components/drugInfo/back-btn";
import DrugInfoC from "@/components/drugInfo/drug-info";
import { generateDrugJsonLd } from "@/lib/json-ld";
import { getDrugByNo } from "@/services/server/getDrugs";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ no: string }>;
}): Promise<Metadata> {
  const { no } = await params;
  const drug = await getDrugByNo(no);

  if (!drug) {
    return {
      title: "Drug Not Found | Drug Directory",
      description: "The requested drug could not be found in our database.",
      alternates: {
        canonical: `/drug-list/${no}`,
      },
      robots: "noindex",
    };
  }

  const { brandName, genericName, agentName, companyName, countryOfOrigin } =
    drug;

  return {
    title: `${brandName} – Full Drug Information & Details`,
    description: `${brandName} (${genericName}) from ${companyName}. Imported by ${agentName}. Origin: ${countryOfOrigin}. View full drug details, strengths, and indications.`,
    alternates: {
      canonical: `/drug-list/${no}`,
    },
    openGraph: {
      title: `${brandName} – Drug Details`,
      description: `${brandName} (${genericName}) complete information including company, agent, and origin.`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${brandName} – Drug Details`,
      description: `${brandName} (${genericName}) full drug information.`,
    },
  };
}
export default async function DrugInfoPage({
  params,
}: {
  params: Promise<{ no: string }>;
}) {
  const { no } = await params;
  const drug = await getDrugByNo(no);

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
          {drug.brandName}
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
