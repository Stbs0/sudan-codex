import type { GetDrugBySlugReturnType } from "@/services/server/getDrugs";
import {
  db,
  type agentStatsTable,
  type companyStatsTable,
  type drugStatsTable,
  type genericStatsTable,
} from "@sudan-codex/db";
import { eq, sql } from "drizzle-orm";
import { Suspense, use } from "react";
import { Skeleton } from "../ui/skeleton";

type ViewCountProps = {
  table:
    | typeof genericStatsTable
    | typeof companyStatsTable
    | typeof agentStatsTable
    | typeof drugStatsTable;

  id: number;
  createdAt: GetDrugBySlugReturnType["createdAt"];
  updatedAt: GetDrugBySlugReturnType["updatedAt"];
};
const ViewCount = ({ table, id, createdAt, updatedAt }: ViewCountProps) => {
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
          table={table}
          id={id}
        />
      </Suspense>
    </div>
  );
};

const Count = ({ table, id }: Pick<ViewCountProps, "table" | "id">) => {
  const view_count = use(
    db
      .update(table)
      .set({ view_count: sql`${table.view_count} + 1` })
      .where(eq(table.id, id))
      .returning({ view_count: table.view_count })
  );
  return (
    <p className='text-muted-foreground text-sm'>
      View count: {view_count?.[0]?.view_count || 0}
    </p>
  );
};
export default ViewCount;
