import { Drug } from "@/types/types";
import Dexie, { Table } from "dexie";

export class AppDatabase extends Dexie {
  items!: Table<Drug>;

  constructor() {
    super("AppDatabase");
    this.version(1).stores({
      items:
        "no, brandName, genericName, dosageFormName, strength, packSize, companyName, countryOfOrigin, agentName",
    });
  }
  async isExists() {
    try {
      const count = await this.items.count();
      if (count > 0) {
        console.log("Database already exists");
        return true;
      }
      console.log("Database does not exist");
      return false;
    } catch (error) {
      console.log(error);
    }
  }
  // Method to populate the database
  async populate() {
    try {
      const { default: data } = await import("@/assets/drugData.json");
      await this.items.bulkAdd(data);
      console.log("Database populated with initial data");
    } catch (error) {
      console.log(error);
    }
  }
}

const DBIndexed = new AppDatabase();
export default DBIndexed;
