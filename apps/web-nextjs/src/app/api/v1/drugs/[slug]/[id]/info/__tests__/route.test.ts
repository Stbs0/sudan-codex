import { describe, expect, it } from "vitest";

describe("/api/v1/drug-info/[id] Route Logic", () => {
  describe("id parameter parsing", () => {
    it("parses valid numeric id", () => {
      const idParam = "123";
      const drugId = parseInt(idParam, 10);
      expect(drugId).toBe(123);
      expect(isNaN(drugId)).toBe(false);
    });

    it("returns NaN for non-numeric id", () => {
      const idParam = "abc";
      const drugId = parseInt(idParam, 10);
      expect(isNaN(drugId)).toBe(true);
    });

    it("handles empty id", () => {
      const idParam = "";
      const drugId = parseInt(idParam, 10);
      expect(isNaN(drugId)).toBe(true);
    });
  });
});
