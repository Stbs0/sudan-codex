import { describe, expect, it } from "vitest";
import {
  cn,
  getInitials,
  getOpenFdaSearchUrl,
  parseQuery,
  slugify,
} from "../utils";

describe("cn (className merge)", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", true && "active", false && "hidden")).toBe("base active");
  });

  it("handles arrays", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });

  it("merges tailwind classes correctly", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("handles objects", () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
  });

  it("handles undefined and null", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });
});

describe("getInitials", () => {
  it("returns initials from full name", () => {
    expect(getInitials("John Doe")).toBe("JD");
  });

  it("returns single initial for single name", () => {
    expect(getInitials("John")).toBe("J");
  });

  it("handles names with multiple words", () => {
    expect(getInitials("John Michael Doe")).toBe("JMD");
  });

  it("handles extra spaces", () => {
    expect(getInitials("  John   Doe  ")).toBe("JD");
  });

  it("handles lowercase names", () => {
    expect(getInitials("john doe")).toBe("JD");
  });
});

describe("parseQuery", () => {
  it("removes numbers and special chars", () => {
    expect(parseQuery("aspirin 500mg")).toBe("aspirin*+AND+*mg");
  });

  it("removes percentage symbols", () => {
    expect(parseQuery("test 10%")).toBe("test*+AND+*");
  });

  it("removes parentheses", () => {
    expect(parseQuery("test (example)")).toBe("test*+AND+*example");
  });

  it("replaces spaces with AND operator", () => {
    expect(parseQuery("drug name")).toBe("drug*+AND+*name");
  });

  it("handles multiple spaces", () => {
    expect(parseQuery("drug   name")).toBe("drug*+AND+*name");
  });

  it("handles empty string", () => {
    expect(parseQuery("")).toBe("");
  });
});

describe("getOpenFdaSearchUrl", () => {
  it("generates correct FDA search URL", () => {
    const result = getOpenFdaSearchUrl("paracetamol");
    expect(result).toContain("spl_product_data_elements");
    expect(result).toContain("paracetamol");
    expect(result).toContain("limit=5");
  });

  it("wraps query in wildcards", () => {
    const result = getOpenFdaSearchUrl("aspirin");
    expect(result).toContain("(*aspirin*)");
  });
});

describe("slugify", () => {
  it("converts text to lowercase", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("replaces spaces with hyphens", () => {
    expect(slugify("foo bar baz")).toBe("foo-bar-baz");
  });

  it("removes special characters", () => {
    expect(slugify("hello@world!")).toBe("helloworld");
  });

  it("removes leading and trailing hyphens", () => {
    expect(slugify("-hello-world-")).toBe("hello-world");
  });

  it("collapses multiple hyphens", () => {
    expect(slugify("hello---world")).toBe("hello-world");
  });

  it("handles empty string", () => {
    expect(slugify("")).toBe("");
  });

  it("handles string with only special chars", () => {
    expect(slugify("@#$%")).toBe("");
  });

  it("preserves numbers", () => {
    expect(slugify("drug 500mg")).toBe("drug-500mg");
  });
});
