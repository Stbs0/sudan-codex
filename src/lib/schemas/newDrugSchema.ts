import { z } from "zod";

const minimumStringMsg = { message: "minimum 2 characters" };
const maximumStringMsg = { message: "maximum 50 characters" };

const formSchema = z.object({
  brand: z.string().min(2, minimumStringMsg).max(50, maximumStringMsg),

  generics: z.array(
    z.object({
      generic: z.string().min(2, minimumStringMsg).max(50, maximumStringMsg),
    })
  ),
  manufacturer: z.string().min(2, minimumStringMsg).max(50, maximumStringMsg),

  dosageForm: z.string().min(2, minimumStringMsg).max(50, maximumStringMsg),

  packaging: z.object({
    packageForm: z.string().min(2).max(50),
    number: z
      .number()

      .positive(),
  }),

  agency: z.string().min(2).max(50),

  price: z
    .number()
    .multipleOf(100, { message: "price must be multiple of 100" })
    .positive(),

  strength: z.array(
    z.object({
      nominator: z.number(),
      denominator: z.number().optional(),
      nominatorUnit: z
        .string()
        .min(2, minimumStringMsg)
        .max(50, maximumStringMsg),
      denominatorUnit: z
        .string()
        .min(2, minimumStringMsg)
        .max(50, maximumStringMsg)
        .optional(),
    })
  ),
});
export type FormSchema = z.infer<typeof formSchema>;
export default formSchema;
