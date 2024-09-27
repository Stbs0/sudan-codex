export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};


export type Unit = {
  value: string;
  label: string;
};


export type UnitCategory = {
  label: string;
  units: Unit[];
};
