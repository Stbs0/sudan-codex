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

export const getOpenFdaSearchUrl = (
  genericName?: string,
  dosageForm?: string,
  strength?: string,
  _brandName?: string,
  _refetch?: boolean
) => {
  const encodedDosageForm = dosageForm;
  const encodedGenericName = genericName;
  const encodedStrength = strength;

  const genericNameQuery = genericName
    ? `(openfda.generic_name:"${encodedGenericName}")`
    : "";
  // const brandNameQuery = brandName
  //   ? `(openfda.brand_name:"${encodedBrandName}")`
  //   : "";
  const dosageFormQuery = dosageForm
    ? `(dosage_forms_and_strengths:"${encodedDosageForm + "%20" + encodedStrength}")`
    : "";

  const strengthQuery = strength
    ? `(openfda.strength:"${encodedStrength}")`
    : "";
  console.log(genericNameQuery);
  console.log(dosageFormQuery);
  console.log(strengthQuery);
  console.log(
    `${OPENFDA_SEARCH_URL}${genericNameQuery}+AND+${dosageFormQuery}+AND+${strengthQuery}&limit=5`
  );

  return encodeURI(
    `${OPENFDA_SEARCH_URL}${genericNameQuery}+AND+${dosageFormQuery}&limit=5`
  );
};
