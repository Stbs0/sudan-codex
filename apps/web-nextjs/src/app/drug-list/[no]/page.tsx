import { DrugDescriptions } from "@/components/drugInfo/drug-descriptions";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import BackBtn from "@/components/drugInfo/back-btn";
import DrugInfoC from "@/components/drugInfo/drug-info";
import drugs from "@/data/drugData.json";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return drugs.map((drug) => ({
    no: drug.no,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ no: string }>;
}): Promise<Metadata> {
  const { no } = await params;

  const drug = drugs.find((d) => d.no === no);

  if (!drug) {
    return {
      title: "Drug Not Found | Drug Directory",
      description: "The requested drug could not be found in our database.",
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
  const drug = drugs.find((d) => d.no === no);

  // TODO: add redirect to 404 page
  if (!drug) notFound();
  return (
    <div className='container mx-auto max-w-5xl px-4 py-6'>
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
