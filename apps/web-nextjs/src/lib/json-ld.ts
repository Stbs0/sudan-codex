import type {
  ItemList,
  MedicalWebPage,
  Person,
  WebSite,
  WithContext,
} from "schema-dts";
import type { Drug as LocalDrugType } from "./types";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.sudancodex.app";

export const generateDrugJsonLd = (
  drug: LocalDrugType
): WithContext<MedicalWebPage> => {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": SITE_URL + `/drug-list/${drug.no}`,
    url: SITE_URL + `/drug-list/${drug.no}`,
    name: `${drug.brandName} - Drug Information`,
    description: `Detailed information about ${drug.brandName} (${drug.genericName}) available in Sudan.`,

    // We tell Google: The "Main Entity" of this page is this Drug.
    // This preserves your data but stops Google from asking for a Price Tag.
    mainEntity: {
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
        {
          "@type": "PropertyValue",
          name: "Strength",
          value: drug.strength || "Unknown Strength",
        },
      ],
      dosageForm: drug.dosageFormName || "Unknown Dosage Form",
      brand: {
        "@type": "Brand",
        name: drug.brandName || "Unknown Brand",
      },
      countryOfOrigin: {
        "@type": "Country",
        name: drug.countryOfOrigin || "Unknown Country",
      },
      proprietaryName: drug.brandName || "Unknown Brand",
      manufacturer: {
        "@type": "Organization",
        name: drug.companyName || "Unknown Manufacturer",
      },
    },
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
  url: SITE_URL,
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
    numberOfItems: drugs.length, // this is fine
    itemListOrder: "Ascending",
    itemListElement: drugs.slice(0, 3).map((drug, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: SITE_URL + `/drug-list/${drug.no}`,
      name: `${drug.brandName || "Unknown Brand"} (${drug.genericName || "Unknown Generic Name"})`,
    })),
  };
};
