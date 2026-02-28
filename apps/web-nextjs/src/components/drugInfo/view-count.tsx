"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import type { GetDrugBySlugReturnType } from "@/services/server/getDrugs";

import { Skeleton } from "../ui/skeleton";

import { Count } from "./count";

export type ViewCountProps = {
  id: number;
  createdAt: GetDrugBySlugReturnType["createdAt"];
  updatedAt: GetDrugBySlugReturnType["updatedAt"];
  entity: "agents" | "generics" | "companies" | "drugs";
  slug: string;
};

const ViewCount = ({
  id,
  createdAt,
  updatedAt,
  entity,
  slug,
}: ViewCountProps) => {
  return (
    <div className='flex items-center gap-2'>
      <p className='text-muted-foreground text-sm'>
        Added on: {createdAt?.toISOString().split("T")[0]}
      </p>
      <p className='text-muted-foreground text-sm'>
        Last updated: {updatedAt?.toISOString().split("T")[0]}
      </p>
      <ErrorBoundary
        fallback={
          <p className='text-muted-foreground text-sm'>View count: N/A</p>
        }>
        <Suspense fallback={<Skeleton className='h-4 w-24' />}>
          <Count
            id={id}
            entity={entity}
            slug={slug}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ViewCount;
