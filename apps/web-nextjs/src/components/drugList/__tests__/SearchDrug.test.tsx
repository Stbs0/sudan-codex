import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SearchDrug from "../SearchDrug";

// Mock the dependencies
vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  usePathname: () => "/",
  useRouter: () => ({
    replace: vi.fn(),
  }),
}));

describe("SearchDrug", () => {
  it("renders search input", () => {
    render(<SearchDrug />);
    const input = screen.getByPlaceholderText("Search and/or filter drugs...");
    expect(input).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    render(<SearchDrug />);
    const input = screen.getByPlaceholderText("Search and/or filter drugs...");

    fireEvent.change(input, { target: { value: "Test Drug" } });
    expect(input).toHaveValue("Test Drug");
  });
});
