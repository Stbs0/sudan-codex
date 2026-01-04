import { relations } from "drizzle-orm";
import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";
import z from "zod";

export const countriesTable = sqliteTable("countries", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const companiesTable = sqliteTable("companies", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const agentsTable = sqliteTable("agents", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const genericsTable = sqliteTable("generics", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const drugsTable = sqliteTable(
  "drugs",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    brand_name: text("brand_name").notNull(),
    slug: text("slug").notNull().unique(),
    dosage_form: text("dosage_form"),
    pack_size: text("pack_size"),
    strength: text("strength"),
    company_id: int("company_id").references(() => companiesTable.id),
    company_name: text("company_name"),
    agent_id: int("agent_id").references(() => agentsTable.id),
    agent_name: text("agent_name"),
    generic_id: int("generic_id").references(() => genericsTable.id),
    generic_name: text("generic_name"),
    country_id: int("country_id").references(() => countriesTable.id),
    country_name: text("country_name"),
  },
  (table) => [
    index("brand_name_idx").on(table.brand_name),
    index("company_name_idx").on(table.company_name),
    index("agent_name_idx").on(table.agent_name),
    index("generic_name_idx").on(table.generic_name),
    index("country_name_idx").on(table.country_name),
  ],
);

// --- 1. Company Stats ---
// "When viewing a Company, show me its footprint."
export const companyStatsTable = sqliteTable("company_stats", {
  id: int("id").primaryKey({ autoIncrement: true }),
  company_id: int("company_id")
    .references(() => companiesTable.id, { onDelete: "cascade" })
    .notNull()
    .unique(),

  // The Counts
  total_brands: int("total_brands").default(0), // How many drugs they have
  related_agents: int("related_agents").default(0), // How many agents distribute their stuff
  related_generics: int("related_generics").default(0), // How many formulas they use
});

// --- 2. Agent Stats ---
// "When viewing an Agent, show me who they represent."
export const agentStatsTable = sqliteTable("agent_stats", {
  id: int("id").primaryKey({ autoIncrement: true }),
  agent_id: int("agent_id")
    .references(() => agentsTable.id, { onDelete: "cascade" })
    .notNull()
    .unique(),

  // The Counts
  total_brands: int("total_brands").default(0), // Total products they carry
  related_companies: int("related_companies").default(0), // How many manufacturers they work with
  related_generics: int("related_generics").default(0), // Portfolio variety
});

// --- 3. Generic Stats ---
// "When viewing a Generic (e.g. Paracetamol), show market diversity."
export const genericStatsTable = sqliteTable("generic_stats", {
  id: int("id").primaryKey({ autoIncrement: true }),
  generic_id: int("generic_id")
    .references(() => genericsTable.id, { onDelete: "cascade" })
    .notNull()
    .unique(),

  // The Counts
  total_brands: int("total_brands").default(0), // How many market versions exist
  related_companies: int("related_companies").default(0), // How many factories make this
  related_agents: int("related_agents").default(0), // How many distributors sell this
});

// --- 4. Brand (Drug) Stats ---
// Usually 1:1, but useful for caching popularity or "related" metrics if you expand later.
export const drugStatsTable = sqliteTable("drug_stats", {
  id: int("id").primaryKey({ autoIncrement: true }),
  drug_id: int("drug_id")
    .references(() => drugsTable.id, { onDelete: "cascade" })
    .notNull()
    .unique(),

  // Since a Drug row links to only 1 Company/Agent, counts aren't needed here.
  // Use this for engagement stats instead:
  view_count: int("view_count").default(0),
  bookmark_count: int("bookmark_count").default(0),
});

export const drugsRelations = relations(drugsTable, ({ one }) => ({
  company: one(companiesTable, {
    fields: [drugsTable.company_id],
    references: [companiesTable.id],
  }),
  agent: one(agentsTable, {
    fields: [drugsTable.agent_id],
    references: [agentsTable.id],
  }),
  generic: one(genericsTable, {
    fields: [drugsTable.generic_id],
    references: [genericsTable.id],
  }),
  country: one(countriesTable, {
    fields: [drugsTable.country_id],
    references: [countriesTable.id],
  }),
  stats: one(drugStatsTable, {
    fields: [drugsTable.id],
    references: [drugStatsTable.drug_id],
  }),
}));

// Add these to your existing relations

// 1. Link Companies to their Stats
export const companiesRelations = relations(companiesTable, ({ one }) => ({
  stats: one(companyStatsTable, {
    fields: [companiesTable.id],
    references: [companyStatsTable.company_id],
  }),
}));

// 2. Link Agents to their Stats
export const agentsRelations = relations(agentsTable, ({ one }) => ({
  stats: one(agentStatsTable, {
    fields: [agentsTable.id],
    references: [agentStatsTable.agent_id],
  }),
}));

// 3. Link Generics to their Stats
export const genericsRelations = relations(genericsTable, ({ one }) => ({
  stats: one(genericStatsTable, {
    fields: [genericsTable.id],
    references: [genericStatsTable.generic_id],
  }),
}));
export type Country = typeof countriesTable.$inferSelect;
export type Company = typeof companiesTable.$inferSelect;
export type Agent = typeof agentsTable.$inferSelect;
export type Generic = typeof genericsTable.$inferSelect;
export type Drug = typeof drugsTable.$inferSelect;
export type DrugStats = typeof drugStatsTable.$inferSelect;
export type CompanyStats = typeof companyStatsTable.$inferSelect;
export type AgentStats = typeof agentStatsTable.$inferSelect;
export type GenericStats = typeof genericStatsTable.$inferSelect;
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

export const DrugWithRelationsSelectSchema = DrugSelectSchema.extend({
  company: CompanySelectSchema.nullable(),
  agent: AgentSelectSchema.nullable(),
  generic: GenericSelectSchema.nullable(),
});
export type DrugWithRelations = z.infer<typeof DrugWithRelationsSelectSchema>;

export const AgentApiResponseSchema = z.object({
  data: z.array(
    DrugSelectSchema.pick({
      slug: true,
      brand_name: true,
      company_name: true,
      generic_name: true,
      pack_size: true,
      strength: true,
    }).extend({
      company: CompanySelectSchema.nullable(),
      generic: GenericSelectSchema.nullable(),
    }),
  ),
  stats: AgentWithStatsSelectSchema.omit({ id: true, agent_id: true }),
  name: z.string(),
});

export type AgentApiResponseType = z.infer<typeof AgentApiResponseSchema>;
export const DrugListApiResponseSchema = z.object({
  data: z.array(DrugSelectSchema),
  nextPage: z.number().nullable(),
});