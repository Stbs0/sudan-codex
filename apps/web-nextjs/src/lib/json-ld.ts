import type { Drug, ItemList, Person, WebSite, WithContext } from "schema-dts";
import type { Drug as LocalDrugType } from "./types";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.sudancodex.app";

export const generateDrugJsonLd = (drug: LocalDrugType): WithContext<Drug> => {
  return {
    "@context": "https://schema.org",
    "@type": "Drug",
    name: drug.brandName || "Unknown Brand",
    nonProprietaryName: drug.genericName || "Unknown Generic Name",
    activeIngredient: drug.genericName || "Unknown Active Ingredient",

    identifier: {
      "@type": "PropertyValue",
      name: "Drug ID",
      value: drug.no,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Pack Size",
        value: drug.packSize || "Unknown Pack Size",
      },
      {
        "@type": "PropertyValue",
        name: "Agent",
        value: drug.agentName || "Unknown Agent",
      },
      {
        "@type": "PropertyValue",
        name: "Dosage Form",
        value: drug.dosageFormName || "Unknown Dosage Form",
      },
    ],
    "@id": SITE_URL + `/drug-list/${drug.no}`,
    url: SITE_URL + `/drug-list/${drug.no}`,
    dosageForm: drug.dosageFormName || "Unknown Dosage Form",
    brand: drug.brandName || "Unknown Brand",
    countryOfOrigin: drug.countryOfOrigin || "Unknown Country",
    proprietaryName: drug.brandName || "Unknown Brand",
    manufacturer: {
      "@type": "Organization",
      name: drug.companyName || "Unknown Manufacturer",
    },
    description: `${drug.brandName} (${drug.genericName}) is a medication manufactured by ${drug.companyName}, and distributed by ${drug.agentName} in Sudan. This page provides detailed information about the drug, including its uses, dosage, and side effects.`,
  };
};
const authorInfo: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohammed Ibrahim Mahmoud",
  url: "https://mohammedibrahimmahmoud.pro",
  sameAs: [
    "https://github.com/stbs0",
    "https://www.linkedin.com/in/mohammed-ibrahim-mahmoud",
  ],
  knowsAbout: [
    "Pharmacy",
    "Healthcare",
    "Front-end Development",
    "React",
    "TypeScript",
  ],
};
export const layoutJsonLd: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sudan Codex",
  url: SITE_URL + "",
  author: authorInfo,
  description:
    "Search Sudan’s complete drug index with accurate and up-to-date pharmaceutical information.",
  publisher: authorInfo,
  copyrightHolder: authorInfo,
  copyrightYear: 2025,
};

export const drugListJsonLd = (
  drugs: LocalDrugType[]
): WithContext<ItemList> => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sudan Drug Index",
    description:
      "Browse and search through Sudan's complete drug index including brand names, generic names, and manufacturers.",
    url: SITE_URL + "/drug-list",
    numberOfItems: drugs.length,
    itemListOrder: "Ascending",
    itemListElement: drugs.map((drug, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: SITE_URL + `/drug-list/${drug.no}`,
      name: `${drug.brandName || "Unknown Brand"} (${drug.genericName || "Unknown Generic Name"})`,
    })),
  };
};
