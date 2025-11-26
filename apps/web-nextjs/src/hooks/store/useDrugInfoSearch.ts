"use client";

import { create } from "zustand";

interface DrugInfoStore {
  generic: string;
  refetch: boolean;
  route: string;

  setRoute: (route: string) => void;
  setRefetch: (refetch: boolean) => void;
  setGeneric: (generic: string) => void;
}
export const useDrugInfoSearch = create<DrugInfoStore>((set) => ({
  generic: "",
  refetch: false,
  route: "",
  setRoute: (route) => set({ route: route }),
  setRefetch: (refetch) => set({ refetch: refetch }),
  setGeneric: (generic) => set({ generic: generic }),
}));
