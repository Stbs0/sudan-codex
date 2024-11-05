/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primary: "#7400b8", // Primary color
        accent: "#6930c3", // Accent color
        info: "#5e60ce", // Info color
        success: "#5390d9", // Success color
        warning: "#4ea8de", // Warning color
        danger: "#48bfe3", // Danger color
        light: "#56cfe1", // Light color
        muted: "#64dfdf", // Muted color
        secondary: "#72efdd", // Secondary color
        tertiary: "#80ffdb", // Tertiary color,
        c_federal_blue: {
          100: "#010113",
          200: "#010226",
          300: "#020338",
          400: "#02044b",
          500: "#03045e",
          600: "#0508ae",
          700: "#0f12f8",
          800: "#5f61fa",
          900: "#afb0fd",
          DEFAULT: "#03045e",
        },
        c_honolulu_blue: {
          100: "#001825",
          200: "#003049",
          300: "#00486e",
          400: "#005f93",
          500: "#0077b6",
          600: "#00a2f9",
          700: "#3bbaff",
          800: "#7cd1ff",
          900: "#bee8ff",
          DEFAULT: "#0077b6",
        },
        c_pacific_cyan: {
          100: "#00242b",
          200: "#004756",
          300: "#006b81",
          400: "#008fab",
          500: "#00b4d8",
          600: "#12d8ff",
          700: "#4ee1ff",
          800: "#89ebff",
          900: "#c4f5ff",
          DEFAULT: "#00b4d8",
        },
        c_non_photo_blue: {
          100: "#0a3a43",
          200: "#137586",
          300: "#1dafc9",
          400: "#4ccfe6",
          500: "#90e0ef",
          600: "#a6e7f2",
          700: "#bcedf5",
          800: "#d2f3f9",
          900: "#e9f9fc",
          DEFAULT: "#90e0ef",
        },
        c_light_cyan: {
          100: "#0a444f",
          200: "#15889f",
          300: "#2ac4e3",
          400: "#79daee",
          500: "#caf0f8",
          600: "#d4f3f9",
          700: "#dff6fb",
          800: "#e9f9fc",
          900: "#f4fcfe",
          DEFAULT: "#caf0f8",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
