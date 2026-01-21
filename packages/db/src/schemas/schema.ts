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

export const DrugSelectSchema = createSelectSchema(drugsTable);
export const DrugInfoSchema = createSelectSchema(drugInfoTable).extend({
  updatedAt: z.string(),
  createdAt: z.string(),
});
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
export const GetDrugApiResponseSchema = DrugSelectSchema.omit({
  agent_id: true,
  company_id: true,
  generic_id: true,
  country_id: true,
}).extend({
  updatedAt: z.string(),
  createdAt: z.string(),
  company: CompanySelectSchema.pick({ slug: true, name: true }).nullable(),
  agent: AgentSelectSchema.pick({ slug: true, name: true }).nullable(),
  generic: GenericSelectSchema.pick({ slug: true, name: true }).nullable(),
});

export type GetDrugInfoApiResponseType = z.infer<typeof DrugInfoSchema>;
export type GetDrugApiResponseType = z.infer<typeof GetDrugApiResponseSchema>;

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
  agent: AgentSelectSchema.extend({
    stats: AgentWithStatsSelectSchema.pick({
      total_brands: true,
      related_generics: true,
      related_companies: true,
    }),
    updatedAt: z.string(),
    createdAt: z.string(),
  }),
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
  company: CompanySelectSchema.extend({
    stats: CompanyWithStatsSelectSchema.pick({
      total_brands: true,
      related_generics: true,
      related_agents: true,
    }),
    updatedAt: z.string(),
    createdAt: z.string(),
  }),
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
  generic: GenericSelectSchema.extend({
    stats: GenericWithStatsSelectSchema.pick({
      total_brands: true,
      related_agents: true,
      related_companies: true,
    }),
    updatedAt: z.string(),
    createdAt: z.string(),
  }),
});

export type AgentApiResponseType = z.infer<typeof AgentApiResponseSchema>;
export type CompanyApiResponseType = z.infer<typeof CompanyApiResponseSchema>;
export type GenericApiResponseType = z.infer<typeof GenericApiResponseSchema>;
const infiniteDrugSchema = DrugSelectSchema.pick({
  id: true,
  slug: true,
  brand_name: true,
  generic_name: true,
  agent_name: true,
  company_name: true,
  country_name: true,
  strength: true,
  dosage_form: true,
  pack_size: true,
}).extend({
  company: CompanySelectSchema.pick({ slug: true }).nullable(),
  agent: AgentSelectSchema.pick({ slug: true }).nullable(),
  generic: GenericSelectSchema.pick({ slug: true }).nullable(),
});
export const DrugListApiResponseSchema = z.object({
  data: z.array(infiniteDrugSchema),
  nextPage: z.number().nullable(),
});
export type DrugListApiResponseType = z.infer<typeof DrugListApiResponseSchema>;
