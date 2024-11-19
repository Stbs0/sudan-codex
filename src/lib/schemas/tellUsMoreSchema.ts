import { z } from "zod";

export const tellUsMoreSchema = z.object({
  age: z.string(),
  phoneNumber: z.string(),
  university: z.string(),
  occupation: z.string(),
});

export type tellUsMoreSchemaType = z.infer<typeof tellUsMoreSchema>;
