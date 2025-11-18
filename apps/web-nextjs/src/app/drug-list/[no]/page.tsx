"use client";
import { DrugCard } from "@/src/components/drugInfo/drugCard";
import DrugInfoAccordion from "@/src/components/drugInfo/DrugInfoAccordion";
import SearchDrugInfo from "@/src/components/drugInfo/SearchDrugInfo";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import { Card, CardContent } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { Skeleton } from "@/src/components/ui/skeleton";
import drugDB from "@/src/lib/indexedDB";

import { getDrugInfo } from "@/src/services/drugServices";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

const DrugInfo = () => {
  const { no } = useParams();
  const queryClient = useQueryClient();
  const { data: drug } = useQuery({
    queryKey: ["drug", no],
    queryFn: async () => {
      return (
        (await drugDB.drugList
          .where("no")
          .equals(no as string)
          .toArray()) || []
      );
    },
    select: (data) => data[0],
  });
  const [searchInputs, setSearchInputs] = useState({
    generic: drug?.genericName || "",
    refetch: false,
    route: "",
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["drugInfo", drug?.no],
    enabled: !!drug,
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

    const genericName = (formData.get("genericName") as string | null) ?? "";

    const submittedData = {
      generic: genericName.trim(),

      refetch: true,
      route,
    };
    setSearchInputs(submittedData);
    queryClient.removeQueries({ queryKey: ["drugInfo", drug?.no] });
  };
  if (!drug) return "error";

  return (
    <>
      <div className='container mx-auto flex justify-center py-4'>
        <Card className='flex max-w-5xl flex-col items-center gap-6 p-5 max-md:mx-2 max-md:p-3'>
          <DrugCard drug={drug} />
          <Separator className='w-full' />
          <SearchDrugInfo
            generic={drug?.genericName}
            handleSubmit={handleSubmit}
          />
          <Separator className='w-full' />
          <CardContent className='flex w-full flex-col gap-4'>
            {isError && (
              <Alert className='border-yellow-300 bg-yellow-50'>
                <AlertTitle>Attention</AlertTitle>
                <AlertDescription>
                  If the page didn&apos;t find the drug you are looking for,
                  please try again with a different route and a correct generic
                  name.
                </AlertDescription>
              </Alert>
            )}
            <div className='flex flex-col gap-4'>
              {isLoading ? (
                [...Array(4)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className='mb-4 h-12 w-full'
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
      </div>
    </>
  );
};

export default DrugInfo;
