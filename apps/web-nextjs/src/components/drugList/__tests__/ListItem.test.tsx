import type { Drug } from "@/db/schemas/schema";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ListItem } from "../ListItem";

// Mock useRouter
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const queryClient = new QueryClient();

const mockDrug = {
  id: 1,
  generic_name: "Generic Test",
  brand_name: "Brand Test",
  pack_size: "10s",
  agent_id: 1,
  dosage_form: "Tablet",
  strength: "500mg",
  company_id: 1,
  country_id: 1,
  generic_id: 1,
  slug: "test-slug",
  agent_name: "Test Agent",
  company_name: "Test Company",
  country_name: "Test Country",
} as Drug;

describe("ListItem", () => {
  it("renders drug information correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ListItem drug={mockDrug} isFirst={false} />
      </QueryClientProvider>,
    );

    expect(screen.getByText("Brand Test")).toBeInTheDocument();
    expect(screen.getByText("Generic Test")).toBeInTheDocument();
  });
});
