"use client";
import { useDrugInfoSearch } from "@/hooks/store/useDrugInfoSearch";
import { getDrugInfo } from "@/services/drugServices";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import DrugInfoAccordion from "./DrugInfoAccordion";

export default function DrugInfoContent() {
  const { no } = useParams();
  const { generic, refetch, route } = useDrugInfoSearch();
  const { data } = useSuspenseQuery({
    queryKey: ["drugInfo", no],
    queryFn: async () => {
      return await getDrugInfo(
        generic,

        route,
        refetch
      );
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { openfda, ...rest } = data;

  return (
    <div className='flex flex-col gap-4'>
      <DrugInfoAccordion data={rest} />
    </div>
  );
}
