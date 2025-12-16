import BackBtn from "@/components/drugInfo/back-btn";
import { DrugDescriptions } from "@/components/drugInfo/drug-descriptions";
import DrugInfoC from "@/components/drugInfo/drug-info";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { generateDrugJsonLd } from "@/lib/json-ld";
import { getPostHogServer } from "@/lib/posthog-server";
import { getDrugBySlug } from "@/services/server/getDrugs";
import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

export const revalidate = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let drug;
  try {
    drug = await getDrugBySlug(slug);
  } catch (error) {}

  if (!drug) {
    return {
      title: "Drug Not Found | Drug Directory",
      description: "The requested drug could not be found in our database.",

      robots: "noindex",
    };
  }

  const { brand_name, generic_name, agent_name, company_name, country_name } =
    drug;

  return {
    title: `${brand_name} – Full Drug Information & Details`,
    description: `${brand_name} (${generic_name}) from ${company_name}. Imported by ${agent_name}. Origin: ${country_name}. View full drug details, strengths, and indications.`,
    keywords: [
      generic_name,
      agent_name,
      company_name,
      country_name,
      "Sudan Drug Index",
      "Sudan medical database",
    ].filter(Boolean) as string[],
    alternates: {
      canonical: `/drug-list/${slug}`,
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) return notFound();
  // This for the SEO and google index bc i changed the slug from numbers to real slugs
  const isNumber = /^\d+$/.test(slug);
  if (isNumber) {
    const { default: matchDB } = await import("../../../data/matchDB.json");
    const matchedSlug = matchDB.find((drug) => Number(slug) === drug.id);
    if (!matchedSlug) return notFound();
    return permanentRedirect(`/drug-list/${matchedSlug.slug}`);
  }

  let drug;
  try {
    drug = await getDrugBySlug(slug);
  } catch (error) {
    const posthog = getPostHogServer();
    await posthog.captureExceptionImmediate(error);
  }

  if (!drug) notFound();

  const jsonLd = generateDrugJsonLd(drug);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mb-6 flex items-center gap-3">
        <BackBtn />
        <h1 className="text-xl font-semibold tracking-tight">
          {`${drug.brand_name} (${drug.generic_name} - ${drug.dosage_form} ${drug.strength}) – Full Drug Info.`}
        </h1>
      </div>

      <Card className="flex flex-col gap-6 p-6">
        <DrugDescriptions drug={drug} />
        <Separator />
        <CardContent className="flex w-full flex-col gap-4 p-0">
          <DrugInfoC />
        </CardContent>
      </Card>
    </div>
  );
}
