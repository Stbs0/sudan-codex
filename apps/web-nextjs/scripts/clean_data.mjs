import fs from "fs/promises";
import path from "path";

const drugDataPath = path.join(
  process.cwd(),
  "public",
  "data",
  "drugDataWithSlugs.json"
);
const cleanedDrugDataPath = path.join(
  process.cwd(),
  "public",
  "data",
  "cleanedDrugData.json"
);
const inconsistentDataPath = path.join(
  process.cwd(),
  "public",
  "data",
  "inconsistentData.json"
);

import stringSimilarity from "string-similarity";

// Function to find similar names using string-similarity
function findSimilarNames(names, threshold = 0.8) {
  const similarGroups = [];
  const visited = new Set();

  for (let i = 0; i < names.length; i++) {
    if (visited.has(i)) continue;

    const group = [names[i]];
    visited.add(i);

    for (let j = i + 1; j < names.length; j++) {
      if (visited.has(j)) continue;

      const similarity = stringSimilarity.compareTwoStrings(names[i], names[j]);
      if (similarity >= threshold) {
        // Add a check for the first 5 characters
        if (names[i].substring(0, 5) === names[j].substring(0, 5)) {
          group.push(names[j]);
          visited.add(j);
        }
      }
    }

    if (group.length > 1) {
      similarGroups.push(group);
    }
  }

  return similarGroups;
}

async function main() {
  try {
    const drugData = JSON.parse(await fs.readFile(drugDataPath, "utf-8"));

    const agentNames = [
      ...new Set(drugData.map((drug) => drug.agentName).filter((name) => name)),
    ];
    const companyNames = [
      ...new Set(
        drugData.map((drug) => drug.companyName).filter((name) => name)
      ),
    ];

    const similarAgentNames = findSimilarNames(agentNames);
    const similarCompanyNames = findSimilarNames(companyNames);

    const nameMapping = {};

    similarAgentNames.forEach((group) => {
      const primaryName = group.sort((a, b) => b.length - a.length)[0];
      group.forEach((name) => {
        if (name !== primaryName) {
          nameMapping[name] = primaryName;
        }
      });
    });

    similarCompanyNames.forEach((group) => {
      const primaryName = group.sort((a, b) => b.length - a.length)[0];
      group.forEach((name) => {
        if (name !== primaryName) {
          nameMapping[name] = primaryName;
        }
      });
    });

    const cleanedData = [];
    const inconsistentData = [];

    for (const drug of drugData) {
      const originalDrug = { ...drug };
      let isModified = false;

      if (drug.agentName in nameMapping) {
        drug.agentName = nameMapping[drug.agentName];
        isModified = true;
      }
      if (drug.companyName in nameMapping) {
        drug.companyName = nameMapping[drug.companyName];
        isModified = true;
      }

      cleanedData.push(drug);

      if (isModified) {
        inconsistentData.push({
          original: originalDrug,
          cleaned: drug,
        });
      }
    }

    await fs.writeFile(
      cleanedDrugDataPath,
      JSON.stringify(cleanedData, null, 2)
    );
    await fs.writeFile(
      inconsistentDataPath,
      JSON.stringify(inconsistentData, null, 2)
    );

    console.log("Data cleaning complete.");
    console.log(`Cleaned data saved to: ${cleanedDrugDataPath}`);
    console.log(`Inconsistent data saved to: ${inconsistentDataPath}`);
  } catch (error) {
    console.error("Error processing data:", error);
  }
}

main();
