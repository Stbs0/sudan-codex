import { Drug } from "@/lib/types";
import fs from "fs/promises";
import path from "path";
import { cache } from "react";

export const getAllDrugs = cache(async (): Promise<Drug[]> => {
  const filePath = path.join(process.cwd(), "public/data/drugData.json");
  return JSON.parse(await fs.readFile(filePath, "utf8"));
});

export const getDrugByNo = cache(async (no: string): Promise<Drug | null> => {
  // You can even reuse the first function to keep caching efficient
  const data = await getAllDrugs();
  const drug = data.find((d) => d.no === no) ?? null;

  return drug;
});
