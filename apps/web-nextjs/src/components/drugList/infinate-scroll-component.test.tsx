import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import InfiniteScrollComponent from "./infinate-scroll-component";

// Mock the hook that provides data
const mockLoadMore = vi.fn();
const mockDrugData = {
  pages: [
    {
      data: [
        {
          id: 1,
          slug: "panadol",
          brand_name: "Panadol",
          generic_name: "Paracetamol",
          strength: "500mg",
          dosage_form: "Tablet",
          pack_size: "20",
          agent_name: "Agent",
          company_name: "GSK",
          country_name: "UK",
        },
        {
          id: 2,
          slug: "aspirin",
          brand_name: "Aspirin",
          generic_name: "Acetylsalicylic Acid",
          strength: "300mg",
          dosage_form: "Tablet",
          pack_size: "10",
          agent_name: "Agent 2",
          company_name: "Bayer",
          country_name: "Germany",
        },
      ],
      nextPage: 2,
    },
  ],
  pageParams: [1],
};

vi.mock("../../hooks/useInfiniteScroll", () => ({
  useInfiniteServerScroll: () => ({
    loadMore: mockLoadMore,
    hasMore: true,
    data: mockDrugData,
  }),
}));

// Mock PostHog used in ListItem via other hooks potentially, strictly mocking dependencies
vi.mock("posthog-js/react", () => ({
  usePostHog: () => ({
    capture: vi.fn(),
  }),
}));

// Simple Wrapper for React Query
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return Wrapper;
};

describe("InfiniteScrollComponent", () => {
  it("renders drug list correctly", async () => {
    render(
      <InfiniteScrollComponent
        initialDrugs={{
          data: [],
          nextPage: null,
        }}
      />,
      { wrapper: createWrapper() },
    );

    // Verify drugs are rendered
    expect(await screen.findByText("Panadol")).toBeInTheDocument();
    expect(screen.getByText("Paracetamol")).toBeInTheDocument();
    expect(screen.getByText("Aspirin")).toBeInTheDocument();
  });

  it("renders loading state when data is available", async () => {
    // We mocked data to be present, so InfiniteScroll should render children
    render(
      <InfiniteScrollComponent
        initialDrugs={{
          data: [],
          nextPage: null,
        }}
      />,
      { wrapper: createWrapper() },
    );

    // Check for unique elements
    const medicines = screen.getAllByTestId("drug-card");
    expect(medicines).toHaveLength(2);
  });
});
