import { DrugDescriptions } from "@/components/drugInfo/drug-descriptions";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import DrugInfoC from "@/components/drugInfo/drug-info";
import drugs from "@/data/drugData.json";
import { Metadata } from "next";

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
      canonical: `/drug/${no}`,
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
  if (!drug) return null;
  return (
    <div className='container mx-auto flex justify-center py-4'>
      <Card className='flex max-w-5xl flex-col items-center gap-6 p-5 max-md:mx-2 max-md:p-3'>
        <DrugDescriptions drug={drug} />
        <Separator className='w-full' />
        <CardContent className='flex w-full flex-col gap-4'>
          <DrugInfoC />
        </CardContent>
      </Card>
    </div>
  );
}
