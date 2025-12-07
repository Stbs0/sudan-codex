import * as fs from "fs";
import * as path from "path";

// --- Utility Functions ---
function slugify(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

// --- Type Definitions ---
type Drug = {
  no: string;
  brandName: string;
  genericName: string;
  dosageFormName: string;
  strength: string;
  packSize: string;
  companyName: string;
  countryOfOrigin: string;
  agentName: string;
};

// --- Main Logic ---
const drugDataPath = path.join(__dirname, "../src/data/drugData.json");
const statsOutputPath = path.join(__dirname, "../src/data/stats");

async function generateDrugStatistics() {
  try {
    // --- 1. Read and Parse Data ---
    const drugDataRaw = await fs.promises.readFile(drugDataPath, "utf-8");
    const drugs: Drug[] = JSON.parse(drugDataRaw);

    // --- 2. Process Data ---
    const companies = new Map<
      string,
      { brandNames: Set<string>; slug: string }
    >();
    const agents = new Map<string, { drugCount: number; slug: string }>();
    const genericNames = new Map<string, { drugCount: number; slug: string }>();
    const brandNames = new Map<string, { drugCount: number; slug: string }>();
    const agentCompanyMap = new Map<string, Set<string>>();
    const companyAgentMap = new Map<string, Set<string>>();

    for (const drug of drugs) {
      if (!drug.companyName) continue; // Skip entries without a company name

      // Process companies
      if (!companies.has(drug.companyName)) {
        companies.set(drug.companyName, {
          brandNames: new Set(),
          slug: slugify(drug.companyName),
        });
      }
      companies.get(drug.companyName)!.brandNames.add(drug.brandName);

      // Process agents
      if (drug.agentName) {
        if (!agents.has(drug.agentName)) {
          agents.set(drug.agentName, {
            drugCount: 0,
            slug: slugify(drug.agentName),
          });
        }
        agents.get(drug.agentName)!.drugCount++;
      }

      // Process generic names
      if (drug.genericName) {
        if (!genericNames.has(drug.genericName)) {
          genericNames.set(drug.genericName, {
            drugCount: 0,
            slug: slugify(drug.genericName),
          });
        }
        genericNames.get(drug.genericName)!.drugCount++;
      }

      // Process brand names
      if (drug.brandName) {
        if (!brandNames.has(drug.brandName)) {
          brandNames.set(drug.brandName, {
            drugCount: 0,
            slug: slugify(drug.brandName),
          });
        }
        brandNames.get(drug.brandName)!.drugCount++;
      }

      // Process associations
      if (drug.agentName && drug.companyName) {
        if (!agentCompanyMap.has(drug.agentName))
          agentCompanyMap.set(drug.agentName, new Set());
        agentCompanyMap.get(drug.agentName)!.add(drug.companyName);

        if (!companyAgentMap.has(drug.companyName))
          companyAgentMap.set(drug.companyName, new Set());
        companyAgentMap.get(drug.companyName)!.add(drug.agentName);
      }
    }

    // --- 3. Format and Sort Data ---
    const companyStats = Array.from(companies.entries())
      .map(([name, data]) => ({
        name,
        slug: data.slug,
        numberOfBrandNames: data.brandNames.size,
      }))
      .sort((a, b) => b.numberOfBrandNames - a.numberOfBrandNames);

    const agentStats = Array.from(agents.entries())
      .map(([name, data]) => ({
        name,
        slug: data.slug,
        numberOfDrugs: data.drugCount,
      }))
      .sort((a, b) => b.numberOfDrugs - a.numberOfDrugs);

    const genericNameStats = Array.from(genericNames.entries())
      .map(([name, data]) => ({
        name,
        slug: data.slug,
        numberOfDrugs: data.drugCount,
      }))
      .sort((a, b) => b.numberOfDrugs - a.numberOfDrugs);

    const brandNameStats = Array.from(brandNames.entries())
      .map(([name, data]) => ({
        name,
        slug: data.slug,
        numberOfDrugs: data.drugCount,
      }))
      .sort((a, b) => b.numberOfDrugs - a.numberOfDrugs);

    const agentCompanyAssociations = Array.from(agentCompanyMap.entries())
      .map(([agentName, companies]) => ({
        agentName,
        companies: Array.from(companies).sort(),
      }))
      .sort((a, b) => a.agentName.localeCompare(b.agentName));

    const companyAgentAssociations = Array.from(companyAgentMap.entries())
      .map(([companyName, agents]) => ({
        companyName,
        agents: Array.from(agents).sort(),
      }))
      .sort((a, b) => a.companyName.localeCompare(b.companyName));

    // --- 4. Write to Files ---
    if (!fs.existsSync(statsOutputPath)) {
      fs.mkdirSync(statsOutputPath, { recursive: true });
    }

    const writeFile = (fileName: string, data: unknown) =>
      fs.promises.writeFile(
        path.join(statsOutputPath, fileName),
        JSON.stringify(data, null, 2)
      );

    await Promise.all([
      writeFile("companies.json", companyStats),
      writeFile("agents.json", agentStats),
      writeFile("generics.json", genericNameStats),
      writeFile("brands.json", brandNameStats),
      writeFile("agent-company-associations.json", agentCompanyAssociations),
      writeFile("company-agent-associations.json", companyAgentAssociations),
      writeFile("summary.json", {
        totalEntries: drugs.length,
        totalUniqueCompanies: companies.size,
        totalUniqueAgents: agents.size,
        totalUniqueGenericNames: genericNames.size,
        totalUniqueBrandNames: brandNames.size,
      }),
    ]);

    console.log(`Drug statistics generated successfully in ${statsOutputPath}`);
  } catch (error) {
    console.error("Error generating drug statistics:", error);
  }
}

generateDrugStatistics();
