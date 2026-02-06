import {
  GetAgentBySlugWithStatsReturnType,
  GetCompanyBySlugWithStatsReturnType,
  GetGenericBySlugWithStatsReturnType,
} from "@sudan-codex/db";
import type {
  Dataset,
  ItemList,
  MedicalEntity,
  MedicalWebPage,
  Organization,
  Person,
  WebSite,
  WithContext,
} from "schema-dts";

import type { InfiniteDrugApiResponse } from "@/app/api/v1/drugs/route";
import { GetDrugBySlugReturnType as LocalDrugType } from "@/services/server/getDrugs";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.sudancodex.app";
export const generateDrugJsonLd = (
  drug: LocalDrugType
): WithContext<MedicalWebPage> => {
  const url = `${SITE_URL}/drug-list/${drug.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": url,
    url,
    name: `${drug.brand_name || "Unknown Brand"} Information`,
    description: `Medical information for ${drug.brand_name || "Unknown Brand"} (${drug.generic_name || "Unknown"}) – ${drug.dosage_form || "Unknown"}.`,
    mainEntityOfPage: url,
    isPartOf: {
      "@type": "WebSite",
      name: "Sudan Codex",
      url: SITE_URL,
    },
    dateModified: "2025-12-06",

    mainEntity: {
      "@type": "MedicalEntity",
      name: drug.brand_name || "Unknown Brand",
      alternateName: drug.generic_name,
      description: `Details on ${drug.brand_name || "Unknown"} including strength, dosage form, pack size, manufacturer and country of origin.`,

      manufacturer: {
        "@type": "Organization",
        name: drug.company_name || "Unknown Manufacturer",
      },
      countryOfOrigin: {
        "@type": "Country",
        name: drug.country_name || "Unknown",
      },

      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Strength",
          value: drug.strength || "Unknown",
        },
        {
          "@type": "PropertyValue",
          name: "Dosage Form",
          value: drug.dosage_form || "Unknown",
        },
        {
          "@type": "PropertyValue",
          name: "Pack Size",
          value: drug.pack_size || "Unknown",
        },
        {
          "@type": "PropertyValue",
          name: "Agent",
          value: drug.agent_name || "Unknown",
        },
      ],
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

export const drugListJsonLd = (
  drugs: InfiniteDrugApiResponse["data"]
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
      url: SITE_URL + `/drug-list/${drug.slug}`,
      name: `${drug.brand_name || "Unknown Brand"} (${drug.generic_name || "Unknown Generic Name"})`,
    })),
  };
};

export const generateCompanyJsonLd = (
  company: NonNullable<GetCompanyBySlugWithStatsReturnType>
): WithContext<MedicalWebPage> => {
  const url = `${SITE_URL}/companies/${company.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": url,
    url,
    name: `${company.name} – Pharmaceutical Company in Sudan`,
    description: `Statistical profile and list of drug products manufactured by ${company.name}. View number of drugs, unique generics, and associated agents in Sudan.`,

    mainEntity: {
      "@type": "MedicalBusiness",
      name: company.name,
      description: `${company.name} manufactures ${company.stats.total_brands} drug products across ${company.stats.related_generics} unique generics in Sudan.`,
      url,
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Total Drugs",
          value: company.stats.total_brands!,
        },
        {
          "@type": "PropertyValue",
          name: "Unique Generics",
          value: company.stats.related_generics!,
        },
        {
          "@type": "PropertyValue",
          name: "Unique Agents",
          value: company.stats.related_agents!,
        },
      ],
    },
  };
};

export const generateAgentJsonLd = (
  agent: NonNullable<GetAgentBySlugWithStatsReturnType>
): WithContext<MedicalWebPage> => {
  const url = `${SITE_URL}/agents/${agent.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": url,
    url,
    name: `${agent.name} – Pharmaceutical Agent in Sudan`,
    description: `Comprehensive statistics for ${agent.name}, including the total drugs represented, associated companies, and unique generics in Sudan's pharmaceutical market.`,
    mainEntity: {
      "@type": "Organization",
      name: agent.name,
      description: `${agent.name} represents ${agent.stats.total_brands} drugs across ${agent.stats.related_companies} companies in Sudan.`,
      url,

      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Total Drugs Represented",
          value: agent.stats.total_brands,
        },
        {
          "@type": "PropertyValue",
          name: "Associated Companies",
          value: agent.stats.related_companies,
        },
        {
          "@type": "PropertyValue",
          name: "Associated Generic Names",
          value: agent.stats.related_generics,
        },
      ],
    } as Organization,
  };
};

export const generateGenericJsonLd = (
  generic: NonNullable<GetGenericBySlugWithStatsReturnType>
): WithContext<MedicalWebPage> => {
  const url = `${SITE_URL}/generics/${generic.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": url,
    url,
    name: `${generic.name} – Generic Drug in Sudan`,
    description: `Comprehensive statistics for the generic drug ${generic.name}. View number of drug entries, associated companies, and agents representing it in Sudan.`,
    mainEntity: {
      "@type": "MedicalEntity",
      name: generic.name,
      alternateName: `${generic.name} Generic Drug`,
      description: `${generic.name} is a generic pharmaceutical compound used in multiple formulations. This page shows ${generic.stats.total_brands} registered drug entries from ${generic.stats.related_companies} companies and ${generic.stats.related_agents} agents in Sudan.`,
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Total Drug Entries",
          value: generic.stats.total_brands,
        },
        {
          "@type": "PropertyValue",
          name: "Unique Companies",
          value: generic.stats.related_companies,
        },
        {
          "@type": "PropertyValue",
          name: "Unique Agents",
          value: generic.stats.related_agents,
        },
      ],
      mainEntityOfPage: url,
    } as MedicalEntity,
  };
};

export const generateStatsJsonLd = (): WithContext<Dataset> => {
  const url = `${SITE_URL}/stats`;

  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": url,
    url,
    name: "Sudan Drug Index Statistics",
    description:
      "Comprehensive statistics from the Sudan Codex drug index, including total registered drugs, pharmaceutical companies, brand names, generic names, and agents operating in Sudan.",
    creator: {
      "@type": "Organization",
      name: "Sudan Codex",
      url: SITE_URL,
      sameAs: ["https://www.sudancodex.app"],
    },
    keywords: [
      "Sudan drug statistics",
      "pharmaceutical data Sudan",
      "drug index Sudan",
      "pharma companies Sudan",
      "Sudan Codex dataset",
    ],
    inLanguage: "en",
    license: "https://creativecommons.org/licenses/by-nc/4.0/",
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "text/html",
        contentUrl: url,
      },
    ],
    measurementTechnique: [
      "Pharmaceutical registration data analysis",
      "Drug index aggregation",
    ],
    variableMeasured: [
      {
        "@type": "PropertyValue",
        name: "Total Drugs",
        value: 4661,
      },
      {
        "@type": "PropertyValue",
        name: "Unique Companies",
        value: 536,
      },
      {
        "@type": "PropertyValue",
        name: "Unique Brand Names",
        value: 3752,
      },
      {
        "@type": "PropertyValue",
        name: "Unique Generic Names",
        value: 1098,
      },
      {
        "@type": "PropertyValue",
        name: "Unique Agents",
        value: 154,
      },
    ],
  };
};
