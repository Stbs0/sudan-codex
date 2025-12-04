import { client } from "@/lib/tursoDB";
import { DrugWithSlugs } from "@/lib/types";
import { cache } from "react";

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
