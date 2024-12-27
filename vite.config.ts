/// <reference types="vitest/config" />
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/vitest-setup.ts",
  },
  assetsInclude: ["**/*.svg", "**/*.png"],
  envDir: "./envDir",
  plugins: [
    react(),
    checker({
      // e.g. use TypeScript check
      typescript: true,
    }),
    visualizer({ open: true, filename: "bundle-visualization.html" }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
