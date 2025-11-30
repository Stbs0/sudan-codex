import path from "path";
import { cache } from "react";
import { Drug } from "schema-dts";
import fs from "fs/promises";

export const getDrugs = cache(async () => {
  const filePath = path.join(process.cwd(), "public/data/drugData.json");
  const data = JSON.parse(await fs.readFile(filePath, "utf8"));
  return data as Drug[];
});
