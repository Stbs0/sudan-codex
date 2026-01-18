import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);
export const updateUser = z
  .object({
    age: z.coerce
      .number<number>({ error: "Age must be a number" })
      .min(15, { error: "You must be at least 15 years old" })
      .max(100, { error: "You must be at most 100 years old" }),
    phoneNumber: z
      .string()
      .trim()
      .min(10, { error: "Phone number must be at least 10 characters long" })
      .regex(phoneRegex, "Must be begin with +XXX")
      .nonempty({ error: "Phone number is required" }),
    specialty: z.enum(
      ["Pharmacist", "Doctor", "Nurse", "Allied health professionals", "Other"],
      { error: "Specialty is required" },
    ),
    university: z.string({ error: "University is required" }).trim().nonempty({
      message: "Must not be empty",
    }),
    workPlace: z.string().optional(),
    occupation: z
      .enum([
        "Student",
        "Administrator",
        "Medical Representative",
        "Pharmacist",
      ])
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.specialty === "Pharmacist") {
      if (!data.occupation)
        ctx.addIssue({
          code: "invalid_type",
          expected: "string",
          received: "undefined",
          path: ["occupation"],
          message: "Occupation is required",
        });
      if (!data.workPlace)
        ctx.addIssue({
          code: "invalid_type",
          expected: "string",
          received: "undefined",
          path: ["workPlace"],
          message: "Work place is required",
        });
    }
    if (data.specialty === "Pharmacist" && data.occupation === "Student") {
      if (data.workPlace) {
        ctx.addIssue({
          code: "invalid_type",
          expected: "undefined",
          received: "string",
          path: ["workPlace"],
          message: "Work place is not required",
        });
      }
    }
  });

export type UpdateUserType = z.infer<typeof updateUser>;
