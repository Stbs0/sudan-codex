import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const genericsTable = sqliteTable("generics", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

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
export const genericsRelations = relations(genericsTable, ({ one }) => ({
  stats: one(genericStatsTable, {
    fields: [genericsTable.id],
    references: [genericStatsTable.generic_id],
  }),
}));
export type Generic = typeof genericsTable.$inferSelect;
export type GenericStats = typeof genericStatsTable.$inferSelect;
