/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./__tests__/vitest-setup.ts",
  },
  optimizeDeps: {
    exclude: ["react-scan"],
  },
  envDir: "./envDir",
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
  preview: {
    port: +(process.env.VITE_PREVIEW_PORT || 4173),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
