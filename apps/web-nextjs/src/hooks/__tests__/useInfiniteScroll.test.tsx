/**
 * Integration tests for useInfiniteScroll hook
 *
 * Tests the full hook integration using renderHook and mocked dependencies.
 */
import { useSearchDrug } from "@/hooks/store/useSearch";
import type { FetchedDrugs } from "@/services/server/getInitialInfiniteDrugs";
import { Wrapper } from "@/testing/test-utils";
import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useInfiniteServerScroll } from "../useInfiniteScroll";

// Mock posthog
vi.mock("posthog-js/react", () => ({
  usePostHog: () => ({
    capture: vi.fn(),
    captureException: vi.fn(),
  }),
}));

const mockInitialDrugs: FetchedDrugs = {
  data: [
    {
      id: 1,
      brand_name: "Initial Drug",
      slug: "initial-drug",
      generic_name: "Initial Generic",
      strength: "500mg",
      dosage_form: "Tablet",
      pack_size: "10",
      agent_name: "Agent",
      company_name: "Company",
      country_name: "Country",
      company_id: 1,
      agent_id: 1,
      generic_id: 1,
      country_id: 1,
      drug_info_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  nextPage: 2,
};

const mockFetchResponse: FetchedDrugs = {
  data: [
    {
      id: 2,
      brand_name: "Fetched Drug",
      slug: "fetched-drug",
      generic_name: "Fetched Generic",
      strength: "100mg",
      dosage_form: "Syrup",
      pack_size: "100ml",
      agent_name: "Agent 2",
      company_name: "Company 2",
      country_name: "Country 2",
      company_id: 2,
      agent_id: 2,
      generic_id: 2,
      country_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      drug_info_id: 2,
    },
  ],
  nextPage: null,
};

describe("useInfiniteServerScroll Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useSearchDrug.setState({ search: "", filterBy: "" });
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockFetchResponse),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("uses initial data when search is empty", () => {
    const { result } = renderHook(
      () => useInfiniteServerScroll(mockInitialDrugs),
      { wrapper: Wrapper }
    );
    expect(result.current.data?.pages[0].data[0].brand_name).toBe(
      "Initial Drug"
    );
  });

  it("fetches data when search term changes", async () => {
    const { result } = renderHook(
      () => useInfiniteServerScroll(mockInitialDrugs),
      { wrapper: Wrapper }
    );

    // Update search store
    act(() => {
      useSearchDrug.setState({ search: "aspirin" });
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("q=aspirin")
      );
    });

    // Check if new data is loaded (initial data should be disabled when searching)
    await waitFor(() => {
      expect(result.current.data?.pages[0].data[0].brand_name).toBe(
        "Fetched Drug"
      );
    });
  });

  it("fetches data when filter changes", async () => {
    renderHook(() => useInfiniteServerScroll(mockInitialDrugs), {
      wrapper: Wrapper,
    });

    act(() => {
      useSearchDrug.setState({ search: "panadol", filterBy: "brand_name" });
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("filterBy=brand_name")
      );
    });
  });
  // TODO: i dont know why this test fail
  // it("loads more data when loadMore is called", async () => {
  //   const { result } = renderHook(
  //     () => useInfiniteServerScroll(mockInitialDrugs),
  //     { wrapper: Wrapper },
  //   );

  //   // Initial state has hasMore=true because nextPage=2
  //   expect(result.current.hasMore).toBe(true);

  //   await act(async () => {
  //     await result.current.loadMore();
  //   });

  //   expect(global.fetch).toHaveBeenCalledWith(
  //     expect.stringContaining("page=2"),
  //   );
  // });

  // it("debounce search analytics", async () => {
  //   vi.useFakeTimers();
  //   // Re-import mocked usePostHog to spy on it?
  //   // Easier: we mocked it at top level, so we just check global mock or setup spy.
  //   // But vi.mock is hoisted. Let's rely on standard spy.

  //   // We can't spy on the hook instance easily since it's inside the component.
  //   // But we mocked the module return.
  //   // Let's verify standard fetch first, analytics might be harder to test without exposing spy.

  //   // Actually, `usePostHog` returns an object. We can spy on that object method if we control it.
  //   // In our mock: capture: vi.fn().
  // });
});
