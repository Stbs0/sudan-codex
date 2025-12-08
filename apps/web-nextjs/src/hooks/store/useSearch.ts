"use client";
import { Drug } from "@/db/schemas/schema";
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
  filterBy: "",
  setFilterBy: (value) => set({ filterBy: value }),
}));
