import { relations, sql } from "drizzle-orm";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "./utils";

export const companiesTable = sqliteTable("companies", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  ...timestamps,
});
export const companyStatsTable = sqliteTable("company_stats", {
  id: int("id").primaryKey({ autoIncrement: true }),
  company_id: int("company_id")
    .references(() => companiesTable.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  ...timestamps,
  view_count: int("view_count").default(0),
  bookmark_count: int("bookmark_count").default(0),
  // The Counts
  total_brands: int("total_brands").default(0), // How many drugs they have
  related_agents: int("related_agents").default(0), // How many agents distribute their stuff
  related_generics: int("related_generics").default(0), // How many formulas they use
});
export const companiesRelations = relations(companiesTable, ({ one }) => ({
  stats: one(companyStatsTable, {
    fields: [companiesTable.id],
    references: [companyStatsTable.company_id],
  }),
}));

export type Company = typeof companiesTable.$inferSelect;
export type CompanyStats = typeof companyStatsTable.$inferSelect;
