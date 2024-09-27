import {
  DrugForms,
  InhalationDosageForm,
  InjectableDosageForm,
  OralDosageForm,
  TopicalDosageForm,
  OphthalmicDosageForm,
  OticDosageForm,
  RectalDosageForm,
  VaginalDosageForm,
  UrethralDosageForm,
  TransdermalDosageForm,
  OtherDosageForm,
 
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
      return OphthalmicDosageForm;
    case DrugForms.OTIC:
      return OticDosageForm;
    case DrugForms.RECTAL:
      return RectalDosageForm;
    case DrugForms.TRANSDERMAL:
      return TransdermalDosageForm;
    case DrugForms.URETHRAL:
      return UrethralDosageForm;
    case DrugForms.VAGINAL:
      return VaginalDosageForm;
    case DrugForms.OTHERS:
      return OtherDosageForm;
   
  }
};
export default getDosageForms;
