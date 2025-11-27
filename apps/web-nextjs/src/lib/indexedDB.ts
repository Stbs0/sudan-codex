"use client";
import Dexie, { EntityTable } from "dexie";
import { Drug } from "./types";

const drugDB = new Dexie("DrugIndex") as Dexie & {
  drugList: EntityTable<Drug>;
};
drugDB.version(1).stores({
  drugList:
    "no, brandName, genericName, dosageFormName, strength, packSize, companyName, countryOfOrigin, agentName" as const,
});
export default drugDB;
