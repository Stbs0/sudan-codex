// stores/useDrugFilter.ts
import { create } from "zustand";

interface DrugFilterState {
  search: string;
  setSearch: (value: string) => void;
}

export const useSearchDrug = create<DrugFilterState>((set) => ({
  search: "",
  setSearch: (value) => set({ search: value }),
}));
