/// <reference types="vitest/config" />
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/vitest-setup.ts",
  },
  envDir: "./envDir",
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1600,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
