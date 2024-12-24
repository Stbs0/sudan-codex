import { OPENFDA_SEARCH_URL } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const parseQuery = (str: string) => {
  return str.replace(/[\d+%()]/g, "").replace(/\s+/g, "*+AND+*");
};

export const getOpenFdaSearchUrl = (parsedGenericName: string) => {
  const genericNameQuery = `(spl_product_data_elements:(*${parsedGenericName}*))`;

  const fullQuery = `${OPENFDA_SEARCH_URL}?search=${genericNameQuery}&limit=5`;

  console.log(fullQuery);

  return fullQuery;
};

// const encodedDosageForm = dosageForm?.replace(/ /g, "*");

// const encodedStrength = strength?.replace(/ /g, "*");

// const genericNameQuery = genericName
//   ? `(spl_product_data_elements:"*${encodedGenericName}*")`
//   : "";
// const brandNameQuery = brandName
//    `(openfda.brand_name:"${encodedBrandName}")`
//   : "";

// const strengthQuery = strength
//    `(openfda.strength:"*${encodedStrength}*")`
//   : "";

// console.log(genericNameQuery);
// console.log(dosageFormQuery);
// console.log(strengthQuery);
