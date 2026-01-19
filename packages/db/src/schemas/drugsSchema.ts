import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { agentsTable } from "./agentsSchema";
import { companiesTable } from "./companySchema";
import { genericsTable } from "./genericSchema";
import { timestamps } from "./utils";
export const countriesTable = sqliteTable("countries", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  ...timestamps,
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
    drug_info_id: int("drug_info_id").references(() => drugInfoTable.drug_id),
    ...timestamps,
  },
  (table) => [
    index("brand_name_idx").on(table.brand_name),
    index("company_name_idx").on(table.company_name),
    index("agent_name_idx").on(table.agent_name),
    index("generic_name_idx").on(table.generic_name),
    index("country_name_idx").on(table.country_name),
  ],
);

export const drugStatsTable = sqliteTable("drug_stats", {
  id: int("id").primaryKey({ autoIncrement: true }),
  drug_id: int("drug_id")
    .references(() => drugsTable.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  ...timestamps,
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
  info: one(drugInfoTable, {
    fields: [drugsTable.drug_info_id],
    references: [drugInfoTable.drug_id],
  }),
}));

export const drugInfoTable = sqliteTable(
  "drugInfo",
  {
    drug_id: int("drug_id").primaryKey().unique(),
    title: text("title").default("null"),
    ind: text("ind").default("null"),
    adult: text("adult").default("null"),
    ped: text("ped").default("null"),
    side: text("side").default("null"),
    prgnancy: text("prgnancy").default("null"),
    intermajer: text("intermajer").default("null"),
    clinical: text("clinical").default("null"),
    admin: text("admin").default("null"),
    interminor: text("interminor").default("null"),
    contra: text("contra").default("null"),
    clas: text("clas").default("null"),
    mode: text("mode").default("null"),
    ...timestamps,
  },
  (table) => [index("drug_info_pkey_idx").on(table.drug_id)],
);

export type DrugInfo = typeof drugInfoTable.$inferSelect;
export type DrugStats = typeof drugStatsTable.$inferSelect;
export type Drug = typeof drugsTable.$inferSelect;
