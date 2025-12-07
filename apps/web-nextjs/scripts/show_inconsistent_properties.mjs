import fs from "fs/promises";
import path from "path";

const inconsistentDataPath = path.join(
  process.cwd(),
  "public",
  "data",
  "inconsistentData.json"
);

async function main() {
  try {
    const inconsistentData = JSON.parse(
      await fs.readFile(inconsistentDataPath, "utf-8")
    );

    const differences = inconsistentData
      .map((item) => {
        const diff = {
          no: item.original.no,
          inconsistentProperties: {},
        };

        for (const key in item.original) {
          if (item.original[key] !== item.cleaned[key]) {
            diff.inconsistentProperties[key] = {
              original: item.original[key],
              cleaned: item.cleaned[key],
            };
          }
        }
        return diff;
      })
      .filter((item) => Object.keys(item.inconsistentProperties).length > 0);
    fs.writeFile(
      path.join(process.cwd(), "public", "data", "differences.json"),
      JSON.stringify(differences, null, 2)
    );
    console.log(JSON.stringify(differences, null, 2));
  } catch (error) {
    console.error("Error processing data:", error);
  }
}

main();
