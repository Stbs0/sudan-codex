import { eq } from "drizzle-orm";
import { cache } from "react";
import db from "..";
import { agentsTable, drugsTable } from "../schema";

export const getAllAgents = cache(
  async () => await db.select({ slug: agentsTable.slug }).from(agentsTable)
);

export const getAgentBySlug = cache(
  async (slug: string) =>
    await db.query.agentsTable.findFirst({
      where: eq(agentsTable.slug, slug),
    })
);
export type GetAgentBySlugWithStatsReturnType = Awaited<
  ReturnType<typeof getAgentBySlugWithStats>
>;
export const getAgentBySlugWithStats = cache(async (slug: string) =>
  db.query.agentsTable.findFirst({
    where: eq(agentsTable.slug, slug),
    with: {
      stats: true,
    },
  })
);
export const getAllDrugsRelatedToAgentWithGenericAndCompanies = cache(
  async (agentId: number) =>
    await db.query.drugsTable.findMany({
      where: eq(drugsTable.agent_id, agentId),
      with: {
        generic: {
          columns: {
            name: true,
            slug: true,
          },
        },
        company: {
          columns: {
            name: true,
            slug: true,
          },
        },
      },
    })
);
