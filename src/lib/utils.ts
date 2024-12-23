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
  strength?: string
) => {
  const encodedDosageForm = dosageForm ? encodeURIComponent(dosageForm) : "";
  const encodedGenericName = genericName ? encodeURIComponent(genericName) : "";
  const encodedStrength = strength ? encodeURIComponent(strength) : "";

  // const genericNameQuery = genericName
  //   ? `(openfda.generic_name:"${encodeURIComponent(genericName)}")`
  //   : "";

  const generalsearch = `(dosage_forms_and_strengths:"${encodedDosageForm}"+OR+"${encodedGenericName}"+OR+"${encodedStrength}")`;

  // const dosageFormQuery = dosageForm
  //   ? `(dosage_forms_and_strengths:"${encodedDosageForm + "+AND+" + encodedGenericName + "+AND+" + encodedStrength}")`
  //   : "";
  // const strengthQuery = strength
  //   ? `(openfda.strength:"${encodeURIComponent(strength)}&limit=5")`
  //   : "";
  console.log(`${OPENFDA_SEARCH_URL}${generalsearch}`);
  return `${OPENFDA_SEARCH_URL}${generalsearch}&limit=5`;
};
