import { validatePassword } from "firebase/auth";
import { z } from "zod";
import { auth } from "./firebaseAuth";

export const occupationEnum = z.enum([
  "Student",
  "Administrator",
  "Pharmacist",
  "Other",
]);
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
export const tellUsMoreSchema = z.object({
  age: z.string().trim().nonempty({ message: "Age is required" }),
  phoneNumber: z
    .string()
    .trim()
    .regex(phoneRegex, 'Invalid Number - must be like "+XXX"')
    .nonempty({ message: "Phone number is required" }),

  university: z.string().trim().nonempty({
    message: "University is required",
  }),
  occupation: occupationEnum,
});
export type tellUsMoreSchemaType = z.infer<typeof tellUsMoreSchema>;
