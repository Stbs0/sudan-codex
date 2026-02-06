import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setup-tests.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["e2e/**/*.spec.ts"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
