import { createSelectSchema } from "drizzle-zod";
import z from "zod";
import { agentsTable, agentStatsTable } from "./agentsSchema";
import { companiesTable, companyStatsTable } from "./companySchema";
import {
  countriesTable,
  drugInfoTable,
  drugsTable,
  drugStatsTable,
} from "./drugsSchema";
import { genericsTable, genericStatsTable } from "./genericSchema";

// 4. Link Drugs to their Stats
export const DrugSelectSchema = createSelectSchema(drugsTable);
export const AgentSelectSchema = createSelectSchema(agentsTable);
export const GenericSelectSchema = createSelectSchema(genericsTable);
export const CompanySelectSchema = createSelectSchema(companiesTable);
export const CountrySelectSchema = createSelectSchema(countriesTable);
export const DrugWithStatsSelectSchema = createSelectSchema(drugStatsTable);
export const CompanyWithStatsSelectSchema =
  createSelectSchema(companyStatsTable);
export const AgentWithStatsSelectSchema = createSelectSchema(agentStatsTable);
export const GenericWithStatsSelectSchema =
  createSelectSchema(genericStatsTable);
export const DrugInfoSelectSchema = createSelectSchema(drugInfoTable);
export const DrugWithRelationsSelectSchema = DrugSelectSchema.extend({
  company: CompanySelectSchema.nullable(),
  agent: AgentSelectSchema.nullable(),
  generic: GenericSelectSchema.nullable(),
});
export type DrugWithRelations = z.infer<typeof DrugWithRelationsSelectSchema>;

export const AgentApiResponseSchema = z.object({
  drugs: z.array(
    DrugSelectSchema.pick({
      slug: true,
      brand_name: true,
      company_name: true,
      generic_name: true,
      pack_size: true,
      strength: true,
    }).extend({
      company: CompanySelectSchema.pick({ slug: true }).nullable(),
      generic: GenericSelectSchema.pick({ slug: true }).nullable(),
    }),
  ),
  stats: AgentWithStatsSelectSchema.omit({ id: true, agent_id: true }),
  name: z.string(),
});
export const CompanyApiResponseSchema = z.object({
  drugs: z.array(
    DrugSelectSchema.pick({
      slug: true,
      brand_name: true,
      generic_name: true,
      agent_name: true,
      pack_size: true,
      strength: true,
    }).extend({
      agent: AgentSelectSchema.pick({ slug: true }).nullable(),
      generic: GenericSelectSchema.pick({ slug: true }).nullable(),
    }),
  ),
  stats: CompanyWithStatsSelectSchema.omit({ id: true, company_id: true }),
  name: z.string(),
});
export const GenericApiResponseSchema = z.object({
  drugs: z.array(
    DrugSelectSchema.pick({
      slug: true,
      brand_name: true,
      company_name: true,
      agent_name: true,
      pack_size: true,
      strength: true,
    }).extend({
      agent: AgentSelectSchema.pick({ slug: true }).nullable(),
      company: CompanySelectSchema.pick({ slug: true }).nullable(),
    }),
  ),
  stats: GenericWithStatsSelectSchema.omit({ id: true, generic_id: true }),
  name: z.string(),
});

export type AgentApiResponseType = z.infer<typeof AgentApiResponseSchema>;
export type CompanyApiResponseType = z.infer<typeof CompanyApiResponseSchema>;
export type GenericApiResponseType = z.infer<typeof GenericApiResponseSchema>;

export const DrugListApiResponseSchema = z.object({
  data: z.array(DrugSelectSchema),
  nextPage: z.number().nullable(),
});
