import { createContext } from "react";
import { ThemeProviderState } from "./types/types";
const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};
export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
