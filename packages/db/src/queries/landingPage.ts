import { count, desc, eq } from "drizzle-orm";
import { cache } from "react";

import { db } from "../db";
import { agentsTable, agentStatsTable } from "../schemas/agentsSchema";
import { companiesTable, companyStatsTable } from "../schemas/companySchema";
import { drugsTable, drugStatsTable } from "../schemas/drugsSchema";
import { genericsTable, genericStatsTable } from "../schemas/genericSchema";

export const getLandingPageStats = cache(async () => {
  const [drugsCount, companiesCount, agentsCount, genericsCount] =
    await Promise.all([
      db.select({ count: count() }).from(drugsTable),
      db.select({ count: count() }).from(companiesTable),
      db.select({ count: count() }).from(agentsTable),
      db.select({ count: count() }).from(genericsTable),
    ]);
  return {
    drugs: drugsCount[0].count,
    companies: companiesCount[0].count,
    agents: agentsCount[0].count,
    generics: genericsCount[0].count,
  };
});

export const getTopViewedDrugs = cache(async (limit = 6) => {
  return await db
    .select({
      brand_name: drugsTable.brand_name,
      view_count: drugStatsTable.view_count,
      company_name: drugsTable.company_name,
      slug: drugsTable.slug,
    })
    .from(drugsTable)
    .innerJoin(drugStatsTable, eq(drugsTable.id, drugStatsTable.drug_id))
    .orderBy(desc(drugStatsTable.view_count))
    .limit(limit);
});

export const getTopViewedCompanies = cache(async (limit = 6) => {
  return await db
    .select({
      name: companiesTable.name,
      view_count: companyStatsTable.view_count,
      slug: companiesTable.slug,
    })
    .from(companiesTable)
    .innerJoin(
      companyStatsTable,
      eq(companiesTable.id, companyStatsTable.company_id)
    )

    .orderBy(desc(companyStatsTable.view_count))
    .limit(limit);
});

export const getTopViewedAgents = cache(async (limit = 6) => {
  return await db
    .select({
      name: agentsTable.name,
      view_count: agentStatsTable.view_count,
      slug: agentsTable.slug,
    })
    .from(agentsTable)
    .innerJoin(agentStatsTable, eq(agentsTable.id, agentStatsTable.agent_id))
    .orderBy(desc(agentStatsTable.view_count))
    .limit(limit);
});

export const getTopViewedGenerics = cache(async (limit = 6) => {
  return await db
    .select({
      name: genericsTable.name,
      view_count: genericStatsTable.view_count,
      slug: genericsTable.slug,
    })
    .from(genericsTable)
    .innerJoin(
      genericStatsTable,
      eq(genericsTable.id, genericStatsTable.generic_id)
    )
    .orderBy(desc(genericStatsTable.view_count))
    .limit(limit);
});
