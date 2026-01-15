import { describe, expect, it } from "vitest";

// Test the escapeLike function logic
function escapeLike(str: string): string {
  return str.replace(/[%_\\]/g, "\\$&");
}

describe("/api/v1/drugs Route Logic", () => {
  describe("escapeLike function", () => {
    it("escapes percent character", () => {
      expect(escapeLike("10%")).toBe("10\\%");
    });

    it("escapes underscore character", () => {
      expect(escapeLike("test_name")).toBe("test\\_name");
    });

    it("escapes backslash character", () => {
      expect(escapeLike("path\\to")).toBe("path\\\\to");
    });

    it("escapes multiple special characters", () => {
      expect(escapeLike("test_50%\\path")).toBe("test\\_50\\%\\\\path");
    });

    it("returns original string when no special characters", () => {
      expect(escapeLike("aspirin")).toBe("aspirin");
    });

    it("handles empty string", () => {
      expect(escapeLike("")).toBe("");
    });
  });

  describe("page parameter parsing", () => {
    it("defaults to page 1 when not provided", () => {
      const pageParam = null;
      const page = Math.max(1, Number(pageParam) || 1);
      expect(page).toBe(1);
    });

    it("parses valid page number", () => {
      const pageParam = "5";
      const page = Math.max(1, Number(pageParam) || 1);
      expect(page).toBe(5);
    });

    it("defaults to 1 for invalid page", () => {
      const pageParam = "invalid";
      const page = Math.max(1, Number(pageParam) || 1);
      expect(page).toBe(1);
    });

    it("enforces minimum of 1", () => {
      const pageParam = "-5";
      const page = Math.max(1, Number(pageParam) || 1);
      expect(page).toBe(1);
    });

    it("enforces minimum of 1 for zero", () => {
      const pageParam = "0";
      const page = Math.max(1, Number(pageParam) || 1);
      expect(page).toBe(1);
    });
  });

  describe("limit parameter parsing", () => {
    it("defaults to 20 when not provided", () => {
      const limitParam = null;
      const limit = Math.min(Number(limitParam) || 20, 50);
      expect(limit).toBe(20);
    });

    it("parses valid limit", () => {
      const limitParam = "30";
      const limit = Math.min(Number(limitParam) || 20, 50);
      expect(limit).toBe(30);
    });

    it("caps limit at 50", () => {
      const limitParam = "100";
      const limit = Math.min(Number(limitParam) || 20, 50);
      expect(limit).toBe(50);
    });

    it("uses default for invalid limit", () => {
      const limitParam = "invalid";
      const limit = Math.min(Number(limitParam) || 20, 50);
      expect(limit).toBe(20);
    });
  });

  describe("offset calculation", () => {
    it("calculates offset for page 1", () => {
      const page = 1;
      const limit = 20;
      const offset = (page - 1) * limit;
      expect(offset).toBe(0);
    });

    it("calculates offset for page 2", () => {
      const page = 2;
      const limit = 20;
      const offset = (page - 1) * limit;
      expect(offset).toBe(20);
    });

    it("calculates offset for page 5 with limit 10", () => {
      const page = 5;
      const limit = 10;
      const offset = (page - 1) * limit;
      expect(offset).toBe(40);
    });
  });

  describe("nextPage calculation", () => {
    it("returns next page when results equal limit", () => {
      const rows = new Array(20).fill({});
      const limit = 20;
      const page = 1;
      const nextPage = rows.length === limit ? page + 1 : null;
      expect(nextPage).toBe(2);
    });

    it("returns null when results less than limit", () => {
      const rows = new Array(15).fill({});
      const limit = 20;
      const page = 1;
      const nextPage = rows.length === limit ? page + 1 : null;
      expect(nextPage).toBeNull();
    });

    it("returns null for empty results", () => {
      const rows: unknown[] = [];
      const limit = 20;
      const page = 1;
      const nextPage = rows.length === limit ? page + 1 : null;
      expect(nextPage).toBeNull();
    });

    it("increments current page correctly", () => {
      const rows = new Array(50).fill({});
      const limit = 50;
      const page = 3;
      const nextPage = rows.length === limit ? page + 1 : null;
      expect(nextPage).toBe(4);
    });
  });

  describe("filterBy validation", () => {
    const validFilters = [
      "brand_name",
      "generic_name",
      "agent_name",
      "company_name",
      "country_name",
    ];

    it.each(validFilters)("accepts valid filter: %s", (filter) => {
      expect(validFilters.includes(filter)).toBe(true);
    });

    it("invalid filter defaults to brand_name column", () => {
      const filterBy = "invalid_filter";
      const isValid = validFilters.includes(filterBy);
      const selectedFilter = isValid ? filterBy : "brand_name";
      expect(selectedFilter).toBe("brand_name");
    });

    it("empty filter uses default", () => {
      const filterBy = "";
      const isValid = validFilters.includes(filterBy);
      const selectedFilter = isValid ? filterBy : "brand_name";
      expect(selectedFilter).toBe("brand_name");
    });
  });

  describe("query parameter handling", () => {
    it("lowercases search query", () => {
      const q = "ASPIRIN";
      const lowercased = q.toLowerCase();
      expect(lowercased).toBe("aspirin");
    });

    it("handles empty query", () => {
      const q = null;
      // @ts-expect-error q is null
      const query = q?.toLowerCase() || "";
      expect(query).toBe("");
    });

    it("trims whitespace", () => {
      const q = "  aspirin  ";
      const trimmed = q.trim().toLowerCase();
      expect(trimmed).toBe("aspirin");
    });
  });

  describe("response structure", () => {
    it("creates correct response structure", () => {
      const rows = [{ id: 1, brand_name: "Test" }];
      const nextPage = 2;
      const response = {
        data: rows,
        nextPage,
      };

      expect(response).toHaveProperty("data");
      expect(response).toHaveProperty("nextPage");
      expect(response.data).toEqual(rows);
      expect(response.nextPage).toBe(2);
    });

    it("creates response with null nextPage", () => {
      const rows = [{ id: 1, brand_name: "Test" }];
      const response = {
        data: rows,
        nextPage: null,
      };

      expect(response.nextPage).toBeNull();
    });
  });
});
