import { z } from "zod";

export const occupationLiteral = z.literal(
  ["Student", "Administrator", "Pharmacist", "Medical Representative", "Other"],
  { error: "Please select a valid occupation" },
);
export type Occupation = z.infer<typeof occupationLiteral>;
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);
export const tellUsMoreSchema = z.object({
  age: z.coerce
    .number<number>({ error: "Age must be a number" })
    .min(15, { error: "You must be at least 15 years old" })
    .max(100, { error: "You must be at most 100 years old" }),
  phoneNumber: z
    .string()
    .trim()
    .regex(phoneRegex, 'Must be like "+XXX"')
    .nonempty({ error: "Phone number is required" }),

  university: z.string({ error: "University is required" }).trim().nonempty({
    message: "Must not be empty",
  }),
  occupation: occupationLiteral,
});
export type tellUsMoreSchemaType = z.infer<typeof tellUsMoreSchema>;
