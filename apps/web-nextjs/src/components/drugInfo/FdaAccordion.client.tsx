"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDrugInfoSearch } from "@/hooks/store/useDrugInfoSearch";
import { getDrugInfo } from "@/services/drugServices";

const propToDelete = [
  "spl_patient_package_insert",
  "spl_patient_package_insert_table",
  "spl_unclassified_section",
  "spl_product_data_elements",
];

export default function FdaAccordion({ genericName }: { genericName: string }) {
  const { generic, refetch, route } = useDrugInfoSearch();

  const { data } = useSuspenseQuery({
    queryKey: ["drugInfo", generic, route, refetch],
    queryFn: async () => getDrugInfo(generic, route, refetch),
    // ensure your QueryClient defaultOptions.queries.suspense = true (or set here)
  });

  const { openfda, ...rest } = data ?? {};
  const keys = Object.keys(rest)
    .filter((k) => Array.isArray(rest[k]) && !propToDelete.includes(k))
    .sort((a, b) => a.localeCompare(b));

  return (
    <Accordion
      type='multiple'
      className='w-full'>
      {keys.map((key, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}>
          <AccordionTrigger>
            {key.replace(/_/g, " ").toUpperCase()}
          </AccordionTrigger>
          <AccordionContent>
            <p>{JSON.stringify(rest[key])}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
