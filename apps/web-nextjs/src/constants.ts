import { BarChart, Home, Pill } from "lucide-react";

export const NAV_ITEMS = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },

  {
    title: "Drug list",
    url: "/drug-list",
    icon: Pill,
  },
  {
    title: "Stats",
    url: "/stats",
    icon: BarChart,
  },
] as const;
