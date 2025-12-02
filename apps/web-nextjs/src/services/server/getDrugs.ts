import { client } from "@/lib/tursoDB";
import { Drug, DrugWithSlugs } from "@/lib/types";
import fs from "fs/promises";
import path from "path";
import { cache } from "react";

export const getAllDrugs = cache(async (): Promise<Drug[]> => {
  const filePath = path.join(process.cwd(), "public/data/drugData.json");
  return JSON.parse(await fs.readFile(filePath, "utf8"));
});

export const getDrugByNo = cache(
  async (no: string): Promise<DrugWithSlugs | null> => {
    // You can even reuse the first function to keep caching efficient
    const data = await client.execute({
      sql: "SELECT * FROM drugs WHERE no = ?",
      args: [no],
    });
    if (data.rows.length === 0) return null;

    return data.rows[0] as unknown as DrugWithSlugs;
  }
);
