import { Drug } from "@/db/schema";
import { DrugWithRelations as LocalDrugType } from "@/services/server/getDrugs";
import type {
  ItemList,
  MedicalEntity,
  MedicalWebPage,
  Person,
  WebSite,
  WithContext,
} from "schema-dts";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.sudancodex.app";
export const generateDrugJsonLd = (
  drug: LocalDrugType
): WithContext<MedicalWebPage> => {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": SITE_URL + `/drug-list/${drug.id}`,
    url: SITE_URL + `/drug-list/${drug.id}`,
    name: `${drug.brand_name || "Unknown Brand"} Information`,
    description: `Medical information for ${drug.brand_name || "Unknown Brand"} (${drug.generic_name || "Unknown"}) - ${drug.dosage_form || "Unknown"}.`,

    // We use "MedicalEntity" instead of "Drug".
    // This allows you to list all the specs (Strength, Pack Size)
    // WITHOUT Google asking for a Price or Review.
    mainEntity: {
      "@type": "MedicalEntity",
      name: drug.brand_name || "Unknown Brand",
      alternateName: drug.generic_name, // Maps to "Generic Name" in your UI

      // Use 'additionalProperty' for the specific fields in your screenshot
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Strength",
          value: drug.strength || "Unknown", // Matches "500 mg/ 100 ml"
        },
        {
          "@type": "PropertyValue",
          name: "Dosage Form",
          value: drug.dosage_form || "Unknown", // Matches "Solution for intravenous..."
        },
        {
          "@type": "PropertyValue",
          name: "Pack Size",
          value: drug.pack_size || "Unknown", // Matches "100 Ml Glass Bottle"
        },
        {
          "@type": "PropertyValue",
          name: "Agent",
          value: drug.agent_name || "Unknown", // Matches "Alpha Medical Agencies..."
        },
        {
          manufacturer: {
            "@type": "Organization",
            name: drug.company_name || "Unknown Manufacturer", // Matches "Qatar Pharma..."
          },

          // Country of origin is best placed here or in additionalProperty
          countryOfOrigin: {
            "@type": "Country",
            name: drug.country_name || "Unknown", // Matches "Qatar"
          },
        },
      ],

      // Manufacturer is supported in MedicalEntity
    } as MedicalEntity,
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

export const drugListJsonLd = (drugs: Drug[]): WithContext<ItemList> => {
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
      url: SITE_URL + `/drug-list/${drug.id}`,
      name: `${drug.brand_name || "Unknown Brand"} (${drug.generic_name || "Unknown Generic Name"})`,
    })),
  };
};
