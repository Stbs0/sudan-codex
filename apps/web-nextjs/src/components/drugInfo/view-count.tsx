import type { GetDrugBySlugReturnType } from "@/services/server/getDrugs";
import {
  db,
  type agentStatsTable,
  type companyStatsTable,
  type drugStatsTable,
  type genericStatsTable,
} from "@sudan-codex/db";
import { eq, sql } from "drizzle-orm";
import { Suspense } from "react";
import "server-only";
import { Skeleton } from "../ui/skeleton";
type ViewCountProps = {
  table:
    | typeof genericStatsTable
    | typeof companyStatsTable
    | typeof agentStatsTable
    | typeof drugStatsTable;
  tableRef:
    | typeof genericStatsTable.generic_id
    | typeof companyStatsTable.company_id
    | typeof agentStatsTable.agent_id
    | typeof drugStatsTable.drug_id;
  id: number;
  createdAt: GetDrugBySlugReturnType["createdAt"];
  updatedAt: GetDrugBySlugReturnType["updatedAt"];
};
const ViewCount = async ({
  table,
  id,
  createdAt,
  updatedAt,
  tableRef,
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
          table={table}
          id={id}
          tableRef={tableRef}
        />
      </Suspense>
    </div>
  );
};

const Count = async ({
  table,
  id,
  tableRef,
}: Pick<ViewCountProps, "table" | "id" | "tableRef">) => {
  const newViewCount = await db
    .update(table)
    .set({ view_count: sql`${table.view_count} + 1` })
    .where(eq(tableRef, id))
    .returning({ view_count: table.view_count });

  return (
    <p className='text-muted-foreground text-sm'>
      View count: {newViewCount?.[0]?.view_count}
    </p>
  );
};
export default ViewCount;
