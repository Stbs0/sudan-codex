import { Drug } from "@/types/types";
import Dexie, { Table } from "dexie";

export class DrugIndex extends Dexie {
  drugList!: Table<Drug>;

  constructor() {
    super("DrugIndex");
    this.version(1).stores({
      drugList:
        "no, brandName, genericName, dosageFormName, strength, packSize, companyName, countryOfOrigin, agentName",
    });
  }
  async isExists() {
    const count = await this.drugList.count();
    if (count > 0) {
      console.log("Database already exists");
      return true;
    }
    console.log("Database does not exist");
    return false;
  }
  // Method to populate the database
  async populate() {
    const { default: data } = await import("@/assets/data/drugData.json");
    await this.drugList.bulkAdd(data);
    console.log("Database populated with initial data");
  }
}

const drugDB = new DrugIndex();
export default drugDB;
