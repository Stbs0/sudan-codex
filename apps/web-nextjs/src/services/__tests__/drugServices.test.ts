import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getDrugInfo } from "../drugServices";

// Mock the constants module
vi.mock("@/constants", () => ({
  OPENFDA_SEARCH_URL: "https://api.fda.gov/drug/label.json",
}));

describe("getDrugInfo", () => {
  const mockDrugResult = {
    openfda: {
      brand_name: ["Test Drug"],
      generic_name: ["Test Generic"],
    },
    dosage_and_administration: ["Take daily"],
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("successful responses", () => {
    it("returns first result on successful fetch", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ results: [mockDrugResult] }),
      });

      const result = await getDrugInfo("aspirin", "", false);
      expect(result).toEqual(mockDrugResult);
    });

    it("returns null when no results found", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ results: [] }),
      });

      const result = await getDrugInfo("unknowndrug", "", false);
      expect(result).toBeNull();
    });

    it("returns null when results is undefined", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      });

      const result = await getDrugInfo("unknowndrug", "", false);
      expect(result).toBeNull();
    });
  });

  describe("error handling", () => {
    it("throws error when fetch fails", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      });

      await expect(getDrugInfo("aspirin", "", false)).rejects.toThrow(
        "Failed to fetch drug info"
      );
    });
  });

  describe("URL construction", () => {
    it("constructs basic URL without route when refetch is false", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ results: [mockDrugResult] }),
      });

      await getDrugInfo("paracetamol", "", false);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("spl_product_data_elements")
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("paracetamol")
      );
    });

    it("includes route in URL when refetch is true and route provided", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ results: [mockDrugResult] }),
      });

      await getDrugInfo("aspirin", "ORAL", true);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("openfda.route")
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("ORAL")
      );
    });

    it("does not include route when route is empty", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ results: [mockDrugResult] }),
      });

      await getDrugInfo("aspirin", "", true);

      const calledUrl = (global.fetch as ReturnType<typeof vi.fn>).mock
        .calls[0][0];
      expect(calledUrl).not.toContain("openfda.route");
    });
  });

  describe("query parsing", () => {
    it("parses generic name with special characters", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ results: [mockDrugResult] }),
      });

      // The parseQuery function removes numbers and special chars, replaces spaces
      await getDrugInfo("aspirin 500mg", "", false);

      expect(global.fetch).toHaveBeenCalled();
    });
  });
});
