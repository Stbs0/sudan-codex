import ThemeProviderContext from "@/providers/ThemeProviderContext";
import { ThemeProviderState } from "@/types/types";
import { useContext } from "react";

const useTheme = () => {
  const context = useContext<ThemeProviderState>(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
export default useTheme;
