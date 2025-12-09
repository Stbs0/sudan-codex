import { z } from "zod";

export const occupationEnum = z.enum([
  "Student",
  "Administrator",
  "Pharmacist",
  "Other",
]);
export type OccupationEnumType = z.infer<typeof occupationEnum>;

const phoneRegex = /^\+\d{1,3}\s?\d{7,12}$/;
const englishOnlyRegex = /^[A-Za-z\s]+$/; // ✅ English letters and spaces only

export const tellUsMoreSchema = z.object({
  age: z
    .string()
    .trim()
    .regex(/^\d{1,3}$/, "Age must be 1 or 2 digits")
    .refine((val) => {
      const num = parseInt(val, 10);
      return num >= 1 && num <= 120;
    }, "Age must be between 1 and 120"),

  phoneNumber: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(
      phoneRegex,
      "Phone number must begin with country code, e.g. +249912345678",
    ),

  university: z
    .string()
    .trim()
    .nonempty("University is required")
    .regex(englishOnlyRegex, "University name must be in English only"),

  occupation: occupationEnum,
});

export type tellUsMoreSchemaType = z.infer<typeof tellUsMoreSchema>;
