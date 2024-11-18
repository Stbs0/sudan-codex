import { Drug } from "@/types/types";
import Dexie, { Table } from "dexie";

// Define your data model interface

// Define your database class
export class AppDatabase extends Dexie {
  items!: Table<Drug>;

  constructor() {
    super("AppDatabase");
    this.version(1).stores({
      items:
        "no, brandName, genericName, dosageFormName, strength, packSize, companyName, countryOfOrigin, agentName",
    });
  }

  // Method to populate the database
  async populate(data: Drug[]) {
    const count = await this.items.count();
    try {
      if (count === 0) {
        await this.items.bulkAdd(data);
        console.log("Database populated with initial data");
      } else {
        console.log("Database already contains data");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// Initialize the database instance
const DBIndexed = new AppDatabase();
export default DBIndexed;
