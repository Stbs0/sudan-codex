import { DrugCard } from "@/components/drugInfo/drugCard";
import DrugInfoAccordion from "@/components/drugInfo/DrugInfoAccordion";
import SearchDrugInfo from "@/components/drugInfo/SearchDrugInfo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "@/lib/queryQlient";

import { getDrugInfo } from "@/services/drugServices";
import { Drug } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const DrugInfo = () => {
  const drug = useLoaderData() as Drug;

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
    <Card className='mx-auto max-w-5xl items-center p-6'>
      <CardTitle className='flex flex-col gap-4'>
        <DrugCard drug={drug} />
        <div className='flex flex-col gap-4'>
          <SearchDrugInfo
            generic={drug.genericName}
            handleSubmit={handleSubmit}
          />
        </div>
      </CardTitle>
      <CardContent className='flex flex-col gap-4'>
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
            Object.keys(data).map((key) => (
              <DrugInfoAccordion
                key={key}
                title={key.replace(/_/g, " ")}
                content={data[key]}
              />
            ))
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
