import { db, drugsTable } from "@sudan-codex/db";
import { and, eq, ne } from "drizzle-orm";
import Link from "next/link";

interface RelatedDrugsProps {
  /** The generic slug to find related drugs by */
  genericSlug: string | undefined;
  /** Current drug ID to exclude from results */
  currentDrugId: number;
  /** Current generic name for the heading */
  genericName: string | undefined;
}

export async function RelatedDrugs({
  genericSlug,
  currentDrugId,
  genericName,
}: RelatedDrugsProps): Promise<React.ReactElement | null> {
  if (!genericSlug) return null;

  let relatedDrugs;
  try {
    relatedDrugs = await db.query.drugsTable.findMany({
      columns: {
        id: true,
        brand_name: true,
        slug: true,
        strength: true,
        dosage_form: true,
      },
      where: and(
        eq(drugsTable.generic_name, genericName ?? ""),
        ne(drugsTable.id, currentDrugId)
      ),
      limit: 6,
    });
  } catch (error) {
    console.error("Error fetching related drugs:", error);
    return null;
  }

  if (!relatedDrugs || relatedDrugs.length === 0) return null;

  return (
    <section className='mt-6'>
      <h2 className='mb-4 text-lg font-semibold tracking-tight'>
        Other drugs with {genericName}
      </h2>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
        {relatedDrugs.map((drug) => (
          <Link
            key={drug.id}
            href={`/drug-list/${drug.slug}`}
            className='border-muted hover:border-primary/50 hover:bg-muted/50 flex flex-col gap-1 rounded-lg border p-3 transition-colors'>
            <span className='text-foreground font-medium'>
              {drug.brand_name}
            </span>
            <span className='text-muted-foreground text-xs'>
              {[drug.dosage_form, drug.strength].filter(Boolean).join(" · ")}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
