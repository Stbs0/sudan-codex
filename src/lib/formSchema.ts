import {
  DrugForms,
  OralDosageForm,
  InjectableDosageForm,
  TopicalDosageForm,
  InhalationDosageForm,
  OphthalmicDosageForm,
  OticDosageForm,
  RectalDosageForm,
  VaginalDosageForm,
  UrethralDosageForm,
  TransdermalDosageForm,
  OtherDosageForm,
} from "@/types/formSchema";
import { z } from "zod";


const minimumStringMsg = { message: "minimum 2 characters" };
const maximumStringMsg = { message: "maximum 50 characters" };

const DosageFormUnion = z.union([
  z.nativeEnum(OralDosageForm),
  z.nativeEnum(InjectableDosageForm),
  z.nativeEnum(TopicalDosageForm),
  z.nativeEnum(InhalationDosageForm),
  z.nativeEnum(OphthalmicDosageForm),
  z.nativeEnum(OticDosageForm),
  z.nativeEnum(RectalDosageForm),
  z.nativeEnum(VaginalDosageForm),
  z.nativeEnum(UrethralDosageForm),
  z.nativeEnum(TransdermalDosageForm),
  z.nativeEnum(OtherDosageForm),
]);
const formSchema = z.object({
  brandName: z.string().min(2, minimumStringMsg).max(50, maximumStringMsg),
  genericName: z.string().min(2, minimumStringMsg).max(50, maximumStringMsg),
  manufacturer: z.string().min(2, minimumStringMsg).max(50, maximumStringMsg),
  dosageForm: z.nativeEnum(DrugForms),
  typeOfDosageForm: DosageFormUnion,
  strength: z.string().min(2).max(50),
  packaging: z.string().min(2).max(50),
  price: z.number().multipleOf(100, { message: "price must be multiple of 100" }).positive(),
});

export default formSchema;