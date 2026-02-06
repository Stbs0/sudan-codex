import "server-only";

import { Suspense, use } from "react";

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
      <Suspense fallback={<Skeleton className='h-4 w-24' />}>
        <Count
          id={id}
          entity={entity}
          slug={slug}
        />
      </Suspense>
    </div>
  );
};

const Count = ({
  id,
  entity,
  slug,
}: Pick<ViewCountProps, "id" | "entity" | "slug">) => {
  const newView = use(fetchCount({ entity, id, slug }));

  return (
    <p className='text-muted-foreground text-sm'>
      View count: {newView.view_count}
    </p>
  );
};
export default ViewCount;

const fetchCount = async ({
  entity,
  id,
  slug,
}: {
  entity: ViewCountProps["entity"];
  id: number;
  slug: string;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const res = await fetch(
    `${baseUrl}/api/v1/${entity}/${slug}/${id.toString()}/view`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw Error("view count error" + res.status + " " + error.message);
  }
  return (await res.json()) as { view_count: null | number };
};
