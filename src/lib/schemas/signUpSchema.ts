import { z } from "zod";

const signUpSchema = z
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
export default signUpSchema;
