import { relations, sql } from "drizzle-orm";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { timestamps } from "./utils";

export const agentsTable = sqliteTable("agents", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  ...timestamps,
});

export const agentStatsTable = sqliteTable("agent_stats", {
  id: int("id").primaryKey({ autoIncrement: true }),
  agent_id: int("agent_id")
    .references(() => agentsTable.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  ...timestamps,
  view_count: int("view_count").default(0),
  bookmark_count: int("bookmark_count").default(0),

  // The Counts
  total_brands: int("total_brands").default(0), // Total products they carry
  related_companies: int("related_companies").default(0), // How many manufacturers they work with
  related_generics: int("related_generics").default(0), // Portfolio variety
});
export const agentsRelations = relations(agentsTable, ({ one }) => ({
  stats: one(agentStatsTable, {
    fields: [agentsTable.id],
    references: [agentStatsTable.agent_id],
  }),
}));

export type Agent = typeof agentsTable.$inferSelect;
export type AgentStats = typeof agentStatsTable.$inferSelect;
