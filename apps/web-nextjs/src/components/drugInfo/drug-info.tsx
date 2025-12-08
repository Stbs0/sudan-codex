"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import DrugInfoContent from "./drug-info-content";
import DrugContentErrorFallback from "./error-boundary";
import SearchDrugInfo from "./SearchDrugInfo";

export default function DrugInfo() {
  const { data, isPending } = useAuth();
  const isProfileComplete = data && data.user.isProfileComplete;
  return (
    <>
      {isPending ? (
        <div className='text-center'>Checking your session...</div>
      ) : data && data.user.isProfileComplete ? (
        <>
          <SearchDrugInfo />
          <Separator className='w-full' />
          <ErrorBoundary fallback={<DrugContentErrorFallback />}>
            <Suspense fallback={<Skeleton className='mb-4 h-12 w-full' />}>
              <DrugInfoContent />
            </Suspense>
          </ErrorBoundary>
        </>
      ) : isProfileComplete ? (
        <div className='text-center'>
          Please log in to view drug information.
        </div>
      ) : (
        <div className='space-y-2 text-center'>
          <p>Please complete your profile to view drug information.</p>
          <Button
            asChild
            className=''>
            <Link
              href='/user-info'
              className='text-primary-foreground'>
              Complete Profile
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
