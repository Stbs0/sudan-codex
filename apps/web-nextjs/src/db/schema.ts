import { relations } from "drizzle-orm";
import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
  ]
);
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
}));

export type Country = typeof countriesTable.$inferSelect;
export type Company = typeof companiesTable.$inferSelect;
export type Agent = typeof agentsTable.$inferSelect;
export type Generic = typeof genericsTable.$inferSelect;
export type Drug = typeof drugsTable.$inferSelect;
