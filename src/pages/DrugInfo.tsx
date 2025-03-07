import { DrugCard } from "@/components/drugInfo/drugCard";
import DrugInfoAccordion from "@/components/drugInfo/DrugInfoAccordion";
import SearchDrugInfo from "@/components/drugInfo/SearchDrugInfo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { getDrugInfo } from "@/services/drugServices";
import { Drug } from "@/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const DrugInfo = () => {
  const drug = useLoaderData() as Drug;
  const queryClient = useQueryClient();
  const [searchInputs, setSearchInputs] = useState({
    generic: drug.genericName,
    refetch: false,
    route: "",
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["drugInfo", drug.no],

    queryFn: () => {
      return getDrugInfo(
        searchInputs.generic,

        searchInputs.route,
        searchInputs.refetch
      );
    },
    select: (values) => {
      delete values.openfda;
      return values;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, route: string) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const genericName = formData.get("genericName") as string;

    const submittedData = {
      generic: genericName.trim(),

      refetch: true,
      route,
    };
    setSearchInputs(submittedData);
    queryClient.removeQueries({ queryKey: ["drugInfo", drug.no] });
  };

  return (
    <Card className='mx-auto flex max-w-5xl flex-col items-center gap-6 p-5 max-md:mx-2 max-md:p-3'>
      <CardTitle className='flex flex-col gap-4'>
        <DrugCard drug={drug} />
      </CardTitle>
      <Separator className='w-lg' />
      <div className='flex flex-col gap-4'>
        <SearchDrugInfo
          generic={drug.genericName}
          handleSubmit={handleSubmit}
        />
      </div>
      <Separator className='w-lg' />

      <CardContent className='flex w-full flex-col gap-4'>
        {isError && (
          <Alert className='border-yellow-300 bg-yellow-50'>
            <AlertTitle>Attention</AlertTitle>
            <AlertDescription>
              If the page didn't find the drug you are looking for, please try
              again with a different route and a correct generic name.
            </AlertDescription>
          </Alert>
        )}

        <div className='flex flex-col gap-4'>
          {isLoading ? (
            [...Array(4)].map((_, index) => (
              <Skeleton
                key={index}
                className='mb-4 h-24 w-full'
              />
            ))
          ) : data ? (
            <DrugInfoAccordion data={data} />
          ) : (
            <Alert className='border-red-300 bg-red-50'>
              <AlertTitle>No data found</AlertTitle>
              <AlertDescription>
                Try again with a different route and a correct generic name.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DrugInfo;
