import path from "path";
import { cache } from "react";
import fs from "fs/promises";
import { Drug } from "@/lib/types";

export const getDrugs = cache(async () => {
  const filePath = path.join(process.cwd(), "public/data/drugData.json");
  const data: Drug[] = JSON.parse(await fs.readFile(filePath, "utf8"));
  return data;
});
