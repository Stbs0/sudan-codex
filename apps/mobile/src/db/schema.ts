import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const drugsTable = sqliteTable("mytable", {
  no: int().primaryKey(),
  brandName: text(),
  age: int(),
  genericName: text(),
  dosageFormName: text(),
  strength: text(),
  packSize: text(),
  companyName: text(),
  countryOfOrigin: text(),
  agentName: text(),
});
