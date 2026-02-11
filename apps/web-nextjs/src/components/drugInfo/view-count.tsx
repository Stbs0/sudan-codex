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
  const newView = await updateViewCount(entity, id).catch((error) => {
    console.error(error);
    return { view_count: 0 };
  });
  return (
    <div className='flex items-center gap-2'>
      <p className='text-muted-foreground text-sm'>
        Added on: {createdAt?.toISOString().split("T")[0]}
      </p>
      <p className='text-muted-foreground text-sm'>
        Last updated: {updatedAt?.toISOString().split("T")[0]}
      </p>

      <Count newView={newView} />
    </div>
  );
};

const Count = async ({
  newView,
}: {
  newView: { view_count: number | null };
}) => {
  return (
    <p className='text-muted-foreground text-sm'>
      View count: {newView.view_count ?? 0}
    </p>
  );
};

export default ViewCount;
