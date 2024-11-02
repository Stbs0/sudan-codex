import { z } from "zod";

const logInSchema = z.object({
  email: z.string().email({ message: "invalid email" }),
  password: z.string().min(6, { message: "minimum 6 characters" }),
});

export type LogInSchemaType = z.infer<typeof logInSchema>;
export default logInSchema;
