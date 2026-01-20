import { updateUser, type UpdateUserType } from "@sudan-codex/types";
import { describe, expect, it } from "vitest";

describe("updateUser Schema", () => {
  const baseValidData: UpdateUserType = {
    age: 25,
    phoneNumber: "+249123456789",
    university: "University of Khartoum",
    specialty: "Doctor", // Default to non-pharmacist for base
    occupation: undefined,
    workPlace: undefined,
  };

  describe("Base Fields Validation", () => {
    it("validates correct base data", () => {
      const result = updateUser.safeParse(baseValidData);
      expect(result.success).toBe(true);
    });

    it("requires age to be at least 15", () => {
      const result = updateUser.safeParse({ ...baseValidData, age: 14 });
      expect(result.success).toBe(false);
    });

    it("requires age to be at most 100", () => {
      const result = updateUser.safeParse({ ...baseValidData, age: 101 });
      expect(result.success).toBe(false);
    });

    it("validates phone number format", () => {
      const result = updateUser.safeParse({
        ...baseValidData,
        phoneNumber: "invalid",
      });
      expect(result.success).toBe(false);
    });

    it("requires university", () => {
      const result = updateUser.safeParse({
        ...baseValidData,
        university: "",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("Pharmacist Specialty Logic", () => {
    it("requires occupation if specialty is Pharmacist", () => {
      const data = {
        ...baseValidData,
        specialty: "Pharmacist" as const,
        occupation: undefined,
      };
      const result = updateUser.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.occupation).toContain(
          "Occupation is required"
        );
      }
    });

    describe("Pharmacist - Student", () => {
      const studentData = {
        ...baseValidData,
        specialty: "Pharmacist" as const,
        occupation: "Student" as const,
      };

      it("validates successfully without workplace", () => {
        const result = updateUser.safeParse({
          ...studentData,
          workPlace: undefined,
        });
        expect(result.success).toBe(true);
      });

      it("fails if workplace is provided", () => {
        const result = updateUser.safeParse({
          ...studentData,
          workPlace: "Some Pharmacy",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.flatten().fieldErrors.workPlace).toContain(
            "Work place is not required"
          );
        }
      });
    });

    describe("Pharmacist - Working Professional", () => {
      const professionalOccupations = [
        "Pharmacist",
        "Administrator",
        "Medical Representative",
      ] as const;

      professionalOccupations.forEach((occupation) => {
        describe(`Occupation: ${occupation}`, () => {
          const proData = {
            ...baseValidData,
            specialty: "Pharmacist" as const,
            occupation: occupation,
          };

          it("requires workplace", () => {
            const result = updateUser.safeParse({
              ...proData,
              workPlace: undefined,
            });
            expect(result.success).toBe(false);
            if (!result.success) {
              expect(result.error.flatten().fieldErrors.workPlace).toContain(
                "Work place is required"
              );
            }
          });

          it("validates successfully with workplace", () => {
            const result = updateUser.safeParse({
              ...proData,
              workPlace: "Community Pharmacy",
            });
            expect(result.success).toBe(true);
          });
        });
      });
    });
  });

  describe("Non-Pharmacist Specialty Logic", () => {
    it("does not require occupation for Doctor", () => {
      const result = updateUser.safeParse({
        ...baseValidData,
        specialty: "Doctor",
        occupation: undefined,
      });
      expect(result.success).toBe(true);
    });

    it("does not require workplace for Doctor even if occupation is provided", () => {
      // NOTE: Schema doesn't forbid workplace for others explicitly in superRefine,
      // and it's optional in base object.
      const result = updateUser.safeParse({
        ...baseValidData,
        specialty: "Doctor",
        occupation: "Medical Representative", // Just as example
        workPlace: undefined,
      });
      expect(result.success).toBe(true);
    });
  });
});
