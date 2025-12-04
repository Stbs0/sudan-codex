"use client";
import type { DrugWithSlugs } from "@/lib/types";
import { create } from "zustand";

export type SearchDrugType = keyof Pick<
  DrugWithSlugs,
  "agentName" | "brandName" | "companyName" | "genericName" | "countryOfOrigin"
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
