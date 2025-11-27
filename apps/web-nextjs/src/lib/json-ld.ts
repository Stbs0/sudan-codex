import type { Drug, ItemList, WebSite, WithContext } from "schema-dts";
import type { Drug as LocalDrugType } from "./types";
import { FetchedDrugs } from "@/services/server/getInitialInfiniteDrugs";

export const generateDrugJsonLd = (drug: LocalDrugType): WithContext<Drug> => {
  return {
    "@context": "https://schema.org",
    "@type": "Drug",
    name: drug.brandName,
    nonProprietaryName: drug.genericName,
    activeIngredient: drug.genericName,

    identifier: {
      "@type": "PropertyValue",
      name: "Drug ID",
      value: drug.no,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Pack Size",
        value: drug.packSize,
      },
      {
        "@type": "PropertyValue",
        name: "Agent",
        value: drug.agentName,
      },
      {
        "@type": "PropertyValue",
        name: "Dosage Form",
        value: drug.dosageFormName,
      },
    ],
    "@id": `https://www.sudancodex.app/drug-list/${drug.no}`,
    url: `https://www.sudancodex.app/drug-list/${drug.no}`,
    dosageForm: drug.dosageFormName,
    brand: drug.brandName,
    countryOfOrigin: drug.countryOfOrigin,
    proprietaryName: drug.brandName,
    manufacturer: {
      "@type": "Organization",
      name: drug.companyName,
    },
    description: `${drug.brandName} (${drug.genericName}) is a medication manufactured by ${drug.companyName}, and distributed by ${drug.agentName} in Sudan. This page provides detailed information about the drug, including its uses, dosage, and side effects.`,
  };
};

export const layoutJsonLd: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sudan Codex",
  url: "https://www.sudancodex.app",
  author: {
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
  },
  description:
    "Search Sudan’s complete drug index with accurate and up-to-date pharmaceutical information.",
  publisher: {
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
  },
};

export const drugListJsonLd = (data: FetchedDrugs): WithContext<ItemList> => {
  const drugs = data.data;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sudan Drug Index",
    description:
      "Browse and search through Sudan's complete drug index including brand names, generic names, and manufacturers.",
    url: "https://www.sudancodex.app/drug-list",
    numberOfItems: drugs.length,
    itemListOrder: "Ascending",
    itemListElement: drugs.map((drug, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.sudancodex.app/drug-list/${drug.no}`,
      name: `${drug.brandName} (${drug.genericName})`,
    })),
  };
};
