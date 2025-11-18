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

export const signUpSchema = z
  .object({
    email: z.string().email({ message: "invalid email" }),
    password: z.string().min(6, { message: "minimum 6 characters" }),
    confirmPassword: z.string().min(6, { message: "minimum 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type signUpSchemaType = z.infer<typeof signUpSchema>;

const minimumStringMsg = { message: "minimum 2 characters" };
const maximumStringMsg = { message: "maximum 50 characters" };

export const formSchema = z.object({
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

export const logInSchema = z.object({
  email: z.string().email({ message: "invalid email" }),
  password: z.string().min(6, { message: "minimum 6 characters" }),
});

export const updateUserSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "minimum 2 characters" })
      .or(z.string().optional()),
    email: z
      .string()
      .email({ message: "invalid email" })
      .or(z.string().optional()),
    currentPassword: z
      .string()
      .min(6, { message: "minimum 6 characters" })
      .or(z.string().optional()),
    password: z
      .string()
      .min(6, { message: "minimum 6 characters" })
      .or(z.string().optional()),
    confirmPassword: z.string().optional().or(z.string().optional()),
  })
  .refine(
    async (data) => {
      if (data.confirmPassword) {
        const status = await validatePassword(auth, data.confirmPassword);
        return status.isValid && data.password === data.confirmPassword
          ? true
          : false;
      }

      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );
export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;
export type LogInSchemaType = z.infer<typeof logInSchema>;
