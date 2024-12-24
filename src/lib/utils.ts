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

  const genericNameQuery = genericName
    ? `(openfda.generic_name:"${encodedGenericName}")`
    : "";
  const dosageFormQuery = dosageForm
    ? `(dosage_forms_and_strengths:"${encodedDosageForm}")`
    : "";

  const strengthQuery = strength
    ? `(openfda.strength:"${encodedStrength}")`
    : "";
  console.log(
    `${OPENFDA_SEARCH_URL}${genericNameQuery}+${dosageFormQuery}+${strengthQuery}&limit=5`
  );
  return `${OPENFDA_SEARCH_URL}${genericNameQuery}+${dosageFormQuery}+${strengthQuery}&limit=5`;
};
