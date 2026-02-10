import "server-only";

import { updateViewCount } from "@sudan-codex/db";
import { Suspense, use } from "react";
import { ErrorBoundary } from "react-error-boundary";

import type { GetDrugBySlugReturnType } from "@/services/server/getDrugs";

import { Skeleton } from "../ui/skeleton";

type ViewCountProps = {
  id: number;
  createdAt: GetDrugBySlugReturnType["createdAt"];
  updatedAt: GetDrugBySlugReturnType["updatedAt"];
  entity: "agents" | "generics" | "companies" | "drugs";
  slug: string;
};

const ViewCount = async ({
  id,
  createdAt,
  updatedAt,
  entity,
}: ViewCountProps) => {
  return (
    <div className='flex items-center gap-2'>
      <p className='text-muted-foreground text-sm'>
        Added on: {createdAt?.toISOString().split("T")[0]}
      </p>
      <p className='text-muted-foreground text-sm'>
        Last updated: {updatedAt?.toISOString().split("T")[0]}
      </p>
      <ErrorBoundary fallback={<p>Error loading view count</p>}>
        <Suspense fallback={<Skeleton className='h-4 w-24' />}>
          <Count
            id={id}
            entity={entity}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const Count = ({ id, entity }: Pick<ViewCountProps, "id" | "entity">) => {
  const newView = use(updateViewCount(entity, id));

  return (
    <p className='text-muted-foreground text-sm'>
      View count: {newView?.view_count ?? 0}
    </p>
  );
};

export default ViewCount;
