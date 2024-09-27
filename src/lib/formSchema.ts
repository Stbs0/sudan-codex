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
  brand: z.string().min(2, minimumStringMsg).max(50, maximumStringMsg),

  generic: z.string().min(2, minimumStringMsg).max(50, maximumStringMsg),

  manufacturer: z.string().min(2, minimumStringMsg).max(50, maximumStringMsg),

  dosageForm: z.nativeEnum(DrugForms),

  typeOfDosageForm: DosageFormUnion,

  strength: z.object({
    number: z
      .number()
      .min(0, { message: "number must be greater than 0" })
      .max(1000, { message: "number must be less than 1000" }),
    nominator: z.string().min(3, minimumStringMsg).max(50, maximumStringMsg),
    denominator: z.string().min(3, minimumStringMsg).max(50, maximumStringMsg),
  }),

  packaging: z.string().min(2).max(50),

  agency: z.string().min(2).max(50),

  price: z
    .number()
    .multipleOf(100, { message: "price must be multiple of 100" })
    .positive(),
});
export type FormSchema = z.infer<typeof formSchema>;
export default formSchema;
