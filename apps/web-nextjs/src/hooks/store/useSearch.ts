"use client";
import { Drug } from "@/lib/types";
import { create } from "zustand";

export interface DrugFilterState {
  search: string;
  setSearch: (value: string) => void;
  filterBy: keyof Drug | "";
  setFilterBy: (value: keyof Drug) => void;
}

export const useSearchDrug = create<DrugFilterState>((set) => ({
  search: "",
  setSearch: (value) => set({ search: value }),
  filterBy: "",
  setFilterBy: (value) => set({ filterBy: value }),
}));
