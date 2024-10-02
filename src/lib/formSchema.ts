
import { z } from "zod";

const minimumStringMsg = { message: "minimum 2 characters" };
const maximumStringMsg = { message: "maximum 50 characters" };

// const DosageFormUnion = z.union([
//   z.nativeEnum(OralDosageForm),
//   z.nativeEnum(InjectableDosageForm),
//   z.nativeEnum(TopicalDosageForm),
//   z.nativeEnum(InhalationDosageForm),
//   z.nativeEnum(OphthalmicDosageForm),
//   z.nativeEnum(OticDosageForm),
//   z.nativeEnum(RectalDosageForm),
//   z.nativeEnum(VaginalDosageForm),
//   z.nativeEnum(UrethralDosageForm),
//   z.nativeEnum(TransdermalDosageForm),
//   z.nativeEnum(OtherDosageForm),
// ]);

const formSchema = z.object({
  brand: z.string().min(2, minimumStringMsg).max(50, maximumStringMsg),

  generics: z.array(
    z.object({
      generic: z.string().min(2, minimumStringMsg).max(50, maximumStringMsg),
    }),
  ),

  manufacturer: z.string().min(2, minimumStringMsg).max(50, maximumStringMsg),

  dosageForm: z.string().min(2, minimumStringMsg).max(50, maximumStringMsg),

  packaging: z.string().min(2).max(50),

  agency: z.string().min(2).max(50),

  price: z
    .number()
    .multipleOf(100, { message: "price must be multiple of 100" })
    .positive(),

  strength: z.array(
    z.object({
      nominator: z.number(),
      denominator: z.number(),
      nominatorUnit: z
        .string()
        .min(2, minimumStringMsg)
        .max(50, maximumStringMsg),
      denominatorUnit: z
        .string()
        .min(2, minimumStringMsg)
        .max(50, maximumStringMsg),
    }),
  ),
});
export type FormSchema = z.infer<typeof formSchema>;
export default formSchema;
