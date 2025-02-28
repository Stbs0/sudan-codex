/// <reference types="vitest/config" />
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/vitest-setup.ts",
  },
  envDir: "./envDir",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
