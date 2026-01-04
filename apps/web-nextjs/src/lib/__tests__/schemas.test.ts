import { tellUsMoreSchema } from "@sudan-codex/types";

describe("tellUsMoreSchema", () => {
  const validData = {
    age: 25,
    phoneNumber: "+249123456789",
    university: "University of Khartoum",
    occupation: "Student" as const,
  };

  describe("valid input", () => {
    it("accepts valid complete data", () => {
      const result = tellUsMoreSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("accepts all valid occupation types", () => {
      const occupations = [
        "Student",
        "Administrator",
        "Pharmacist",
        "Medical Representative",
        "Other",
      ] as const;

      occupations.forEach((occupation) => {
        const result = tellUsMoreSchema.safeParse({
          ...validData,
          occupation,
        });
        expect(result.success).toBe(true);
      });
    });

    it("coerces string age to number", () => {
      const result = tellUsMoreSchema.safeParse({
        ...validData,
        age: "30",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.age).toBe(30);
      }
    });
  });

  describe("age validation", () => {
    it("rejects age below 15", () => {
      const result = tellUsMoreSchema.safeParse({
        ...validData,
        age: 14,
      });
      expect(result.success).toBe(false);
    });

    it("accepts age of exactly 15", () => {
      const result = tellUsMoreSchema.safeParse({
        ...validData,
        age: 15,
      });
      expect(result.success).toBe(true);
    });

    it("rejects age above 100", () => {
      const result = tellUsMoreSchema.safeParse({
        ...validData,
        age: 101,
      });
      expect(result.success).toBe(false);
    });

    it("accepts age of exactly 100", () => {
      const result = tellUsMoreSchema.safeParse({
        ...validData,
        age: 100,
      });
      expect(result.success).toBe(true);
    });
  });

  describe("phoneNumber validation", () => {
    it("accepts phone with country code", () => {
      const result = tellUsMoreSchema.safeParse({
        ...validData,
        phoneNumber: "+249912345678",
      });
      expect(result.success).toBe(true);
    });

    it("accepts phone without country code", () => {
      const result = tellUsMoreSchema.safeParse({
        ...validData,
        phoneNumber: "0912345678",
      });
      expect(result.success).toBe(true);
    });

    it("rejects empty phone number", () => {
      const result = tellUsMoreSchema.safeParse({
        ...validData,
        phoneNumber: "",
      });
      expect(result.success).toBe(false);
    });

    it("trims whitespace from phone number", () => {
      const result = tellUsMoreSchema.safeParse({
        ...validData,
        phoneNumber: "  +249912345678  ",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("university validation", () => {
    it("rejects empty university", () => {
      const result = tellUsMoreSchema.safeParse({
        ...validData,
        university: "",
      });
      expect(result.success).toBe(false);
    });

    it("rejects whitespace-only university", () => {
      const result = tellUsMoreSchema.safeParse({
        ...validData,
        university: "   ",
      });
      expect(result.success).toBe(false);
    });

    it("trims university name", () => {
      const result = tellUsMoreSchema.safeParse({
        ...validData,
        university: "  Test University  ",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.university).toBe("Test University");
      }
    });
  });

  describe("occupation validation", () => {
    it("rejects invalid occupation", () => {
      const result = tellUsMoreSchema.safeParse({
        ...validData,
        occupation: "InvalidOccupation",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("missing fields", () => {
    it("rejects missing age", () => {
      const { age, ...dataWithoutAge } = validData;
      const result = tellUsMoreSchema.safeParse(dataWithoutAge);
      expect(result.success).toBe(false);
    });

    it("rejects missing phoneNumber", () => {
      const { phoneNumber, ...dataWithoutPhone } = validData;
      const result = tellUsMoreSchema.safeParse(dataWithoutPhone);
      expect(result.success).toBe(false);
    });

    it("rejects missing university", () => {
      const { university, ...dataWithoutUniversity } = validData;
      const result = tellUsMoreSchema.safeParse(dataWithoutUniversity);
      expect(result.success).toBe(false);
    });

    it("rejects missing occupation", () => {
      const { occupation, ...dataWithoutOccupation } = validData;
      const result = tellUsMoreSchema.safeParse(dataWithoutOccupation);
      expect(result.success).toBe(false);
    });
  });
});
