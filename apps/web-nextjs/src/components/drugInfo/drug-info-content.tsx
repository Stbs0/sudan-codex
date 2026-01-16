"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDrugInfoSearch } from "@/hooks/store/useDrugInfoSearch";
import { getDrugInfo } from "@/services/drugServices";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { SQLiteRelationalQuery } from "drizzle-orm/sqlite-core/query-builders/query";
import { Suspense, use } from "react";
import { Skeleton } from "../ui/skeleton";
import DrugInfoAccordion from "./DrugInfoAccordion";

export default function DrugInfoContent({
  info,
  genericName = "",
}: {
  genericName: string;
  info:
    | SQLiteRelationalQuery<
        "async",
        | {
            mode: string | null;
            drug_id: number;
            title: string | null;
            ind: string | null;
            adult: string | null;
            ped: string | null;
            side: string | null;
            prgnancy: string | null;
            intermajer: string | null;
            clinical: string | null;
            admin: string | null;
            interminor: string | null;
            contra: string | null;
            clas: string | null;
          }
        | undefined
      >
    | undefined;
}) {
  const drugInfo = info ? use(info) : undefined;
  return (
    <div className='flex flex-col gap-4'>
      {drugInfo ? (
        <DrugInfoAccordion data={drugInfo} />
      ) : (
        <Suspense fallback={<Skeleton className='h-[200px]' />}>
          <FdaAccordion genericName={genericName} />
        </Suspense>
      )}
    </div>
  );
}
const propToDelete = [
  "spl_patient_package_insert",
  "spl_patient_package_insert_table",
  "spl_unclassified_section",
  "spl_product_data_elements",
];
const FdaAccordion = ({ genericName }: { genericName: string }) => {
  const { generic, refetch, route } = useDrugInfoSearch();
  const { data } = useSuspenseQuery({
    queryKey: ["drugInfo", generic, route, refetch],
    queryFn: async () => {
      return await getDrugInfo(
        generic,

        route,
        refetch
      );
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { openfda, ...rest } = data ?? {};

  const keys = Object.keys(rest)
    .filter((key) => Array.isArray(rest[key]) && !propToDelete.includes(key))
    .sort((a, b) => a.localeCompare(b));

  return (
    <Accordion
      type='multiple'
      className='w-full'>
      {keys.map((key, index) => {
        return (
          <AccordionItem
            key={index}
            value={`item-${index}`}>
            <AccordionTrigger>
              {key.replace(/_/g, " ").toUpperCase()}
            </AccordionTrigger>
            <AccordionContent>
              <p>{data[key]}</p>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
  //  Object.keys(data).map((key) => (
  //             <FdaAccordion
  //               key={key}
  //               title={key.replace(/_/g, " ")}
  //               content={data[key]}
  //             />
  //           ))
  // if (typeof content === "string") return null;

  // return (
  //   <Accordion type='multiple'>
  //     <AccordionItem value='item-1'>
  //       <AccordionTrigger>{title.toUpperCase()}</AccordionTrigger>
  //       <AccordionContent className='max-w-l'>{content}</AccordionContent>
  //     </AccordionItem>
  //   </Accordion>
  // );
};
