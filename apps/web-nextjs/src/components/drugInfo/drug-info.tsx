"use client";
import { useAuth } from "@/hooks/useAuth";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Skeleton } from "../ui/skeleton";
import DrugInfoContent from "./drug-info-content";
import DrugContentErrorFallback from "./error-boundary";
import SearchDrugInfo from "./SearchDrugInfo";
import { Separator } from "../ui/separator";

export default function DrugInfo() {
  const { user, authLoading } = useAuth();

  return (
    <>
      {authLoading ? (
        <div className='text-center'>Checking your session...</div>
      ) : user ? (
        <>
          <SearchDrugInfo />
          <Separator className='w-full' />
          <ErrorBoundary fallback={<DrugContentErrorFallback />}>
            <Suspense fallback={<Skeleton className='mb-4 h-12 w-full' />}>
              <DrugInfoContent />
            </Suspense>
          </ErrorBoundary>
        </>
      ) : (
        <div className='text-center'>
          Please log in to view drug information.
        </div>
      )}
    </>
  );
}
