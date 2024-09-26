import {
  DrugForms,
  InhalationDosageForm,
  InjectableDosageForm,
  OralDosageForm,
  TopicalDosageForm,
} from "@/types/formSchema";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getDosageForms = (drugForm: DrugForms) => {
  switch (drugForm) {
    case DrugForms.ORAL:
      return OralDosageForm;
    case DrugForms.INJECTABLE:
      return InjectableDosageForm;
    case DrugForms.TOPICAL:
      return TopicalDosageForm;
    case DrugForms.INHALATION:
      return InhalationDosageForm;

    case DrugForms.OPHTHALMIC:
      return InhalationDosageForm;

    case DrugForms.OTIC:
      return InhalationDosageForm;
    case DrugForms.RECTAL:
      return InhalationDosageForm;
    case DrugForms.OTHERS:
      return InhalationDosageForm;
    case DrugForms.TRANSDERMAL:
      return InhalationDosageForm;
    case DrugForms.URETHRAL:
      return InhalationDosageForm;
    case DrugForms.VAGINAL:
      return InhalationDosageForm;
    default:
      return null;
  }
};
export default getDosageForms;