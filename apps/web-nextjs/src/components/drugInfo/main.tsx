"use client";
import { useAuth } from "@/src/hooks/useAuth";
import drugDB from "@/src/lib/indexedDB";
import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import DrugInfoContent from "./drug-info-content";
import { DrugCard } from "./drugCard";
import DrugContentErrorBoundary from "./error-boundary";
import SearchDrugInfo from "./SearchDrugInfo";
import dynamic from "next/dynamic";

export function D() {
  const { no } = useParams();
  const queryClient = useQueryClient();
  const { user, isLoading: isLoadingAuth } = useAuth();

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, route: string) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const genericName = (formData.get("genericName") as string | null) ?? "";

    const submittedData = {
      generic: genericName.trim(),
      refetch: true,
      route,
    };
    queryClient.cancelQueries({ queryKey: ["drugInfo", drug?.no] });
    queryClient.removeQueries({ queryKey: ["drugInfo", drug?.no] });
    setSearchInputs(submittedData);
    queryClient.refetchQueries({ queryKey: ["drugInfo", drug?.no] });
  };
  if (!drug) return null;
  return (
    <div className='container mx-auto flex justify-center py-4'>
      <Card className='flex max-w-5xl flex-col items-center gap-6 p-5 max-md:mx-2 max-md:p-3'>
        <DrugCard drug={drug} />
        <Separator className='w-full' />
        <SearchDrugInfo
          generic={drug?.genericName}
          handleSubmit={handleSubmit}
        />
        <CardContent className='flex w-full flex-col gap-4'>
          <Separator className='w-full' />
          {!isLoadingAuth && user && (
            <ErrorBoundary fallback={<DrugContentErrorBoundary />}>
              <Suspense fallback={<Skeleton className='mb-4 h-12 w-full' />}>
                <DrugInfoContent
                  no={drug.no}
                  searchInputs={searchInputs}
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
export default dynamic(() => Promise.resolve(D), { ssr: false });
