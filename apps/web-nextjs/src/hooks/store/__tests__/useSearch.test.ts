import { afterEach, describe, expect, it } from "vitest";
import { useSearchDrug } from "../useSearch";

describe("useSearchDrug store", () => {
  // Reset store state after each test
  afterEach(() => {
    useSearchDrug.setState({ search: "", filterBy: "" });
  });

  describe("initial state", () => {
    it("has empty search by default", () => {
      const state = useSearchDrug.getState();
      expect(state.search).toBe("");
    });

    it("has empty filterBy by default", () => {
      const state = useSearchDrug.getState();
      expect(state.filterBy).toBe("");
    });
  });

  describe("setSearch action", () => {
    it("updates search value", () => {
      const { setSearch } = useSearchDrug.getState();
      setSearch("aspirin");
      expect(useSearchDrug.getState().search).toBe("aspirin");
    });

    it("can clear search value", () => {
      const { setSearch } = useSearchDrug.getState();
      setSearch("test");
      setSearch("");
      expect(useSearchDrug.getState().search).toBe("");
    });
  });

  describe("setFilterBy action", () => {
    it("updates filterBy to brand_name", () => {
      const { setFilterBy } = useSearchDrug.getState();
      setFilterBy("brand_name");
      expect(useSearchDrug.getState().filterBy).toBe("brand_name");
    });

    it("updates filterBy to generic_name", () => {
      const { setFilterBy } = useSearchDrug.getState();
      setFilterBy("generic_name");
      expect(useSearchDrug.getState().filterBy).toBe("generic_name");
    });

    it("updates filterBy to agent_name", () => {
      const { setFilterBy } = useSearchDrug.getState();
      setFilterBy("agent_name");
      expect(useSearchDrug.getState().filterBy).toBe("agent_name");
    });

    it("updates filterBy to company_name", () => {
      const { setFilterBy } = useSearchDrug.getState();
      setFilterBy("company_name");
      expect(useSearchDrug.getState().filterBy).toBe("company_name");
    });

    it("updates filterBy to country_name", () => {
      const { setFilterBy } = useSearchDrug.getState();
      setFilterBy("country_name");
      expect(useSearchDrug.getState().filterBy).toBe("country_name");
    });

    it("can clear filterBy", () => {
      const { setFilterBy } = useSearchDrug.getState();
      setFilterBy("brand_name");
      setFilterBy("");
      expect(useSearchDrug.getState().filterBy).toBe("");
    });
  });

  describe("state isolation", () => {
    it("search and filterBy are independent", () => {
      const state = useSearchDrug.getState();
      state.setSearch("test");
      state.setFilterBy("brand_name");

      const newState = useSearchDrug.getState();
      expect(newState.search).toBe("test");
      expect(newState.filterBy).toBe("brand_name");

      newState.setSearch("new value");

      // Filter should remain unchanged
      expect(useSearchDrug.getState().filterBy).toBe("brand_name");
    });
  });

  describe("setState direct usage", () => {
    it("can update state directly", () => {
      useSearchDrug.setState({ search: "direct", filterBy: "generic_name" });

      const state = useSearchDrug.getState();
      expect(state.search).toBe("direct");
      expect(state.filterBy).toBe("generic_name");
    });
  });
});
