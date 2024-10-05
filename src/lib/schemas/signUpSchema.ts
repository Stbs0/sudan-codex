import { z } from "zod";

const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "minimum 2 characters" })
      .max(50, { message: "maximum 50 characters" }),
    lastName: z
      .string()
      .min(2, { message: "minimum 2 characters" })
      .max(50, { message: "maximum 50 characters" }),
    email: z.string().email({ message: "invalid email" }),
    password: z.string().min(6, { message: "minimum 6 characters" }),
    confirmPassword: z.string().min(6, { message: "minimum 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type signUpSchemaType = z.infer<typeof signUpSchema>;
export default signUpSchema;
