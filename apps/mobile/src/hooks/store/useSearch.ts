import type { Drug } from "@sudan-codex/db/schema";
import { create } from "zustand";

export type SearchDrugType = keyof Pick<
  Drug,
  "agent_name" | "brand_name" | "company_name" | "generic_name" | "country_name"
>;

export interface DrugFilterState {
  search: string;
  setSearch: (value: string) => void;
  filterBy: SearchDrugType | "";
  setFilterBy: (value: DrugFilterState["filterBy"]) => void;
}

export const useSearchDrug = create<DrugFilterState>((set) => ({
  search: "",
  setSearch: (value) => set({ search: value }),
  filterBy: "brand_name",
  setFilterBy: (value) => set({ filterBy: value }),
}));
