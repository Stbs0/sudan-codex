import { Drug } from "@/src/lib/types";
import { getDrugInfo } from "@/src/services/drugServices";
import { useSuspenseQuery } from "@tanstack/react-query";
import DrugInfoAccordion from "./DrugInfoAccordion";
import DrugContentErrorBoundary from "./error-boundary";

export default function DrugInfoContent({
  searchInputs,
  no,
}: {
  searchInputs: { generic: string; refetch: boolean; route: string };
  no: Drug["no"];
}) {
  const { data } = useSuspenseQuery({
    queryKey: ["drugInfo", no],
    queryFn: async () => {
      return await getDrugInfo(
        searchInputs.generic,

        searchInputs.route,
        searchInputs.refetch
      );
    },
    select: (values) => {
      if (!values) return;
      delete values.openfda;
      return values;
    },
  });

  return (
    <>
      <div className='flex flex-col gap-4'>
        {data ? (
          <DrugInfoAccordion data={data} />
        ) : (
          <DrugContentErrorBoundary />
        )}
      </div>
    </>
  );
}
