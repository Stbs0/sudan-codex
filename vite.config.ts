/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, PluginOption } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./__tests__/vitest-setup.ts",
  },
  envDir: "./envDir",
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ sourcemap: true}) as PluginOption,
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("firebase/auth")) return "firebase/auth";
            if (id.includes("firebase/firestore")) return "firebase/firestore";
            if (id.includes("firebase")) return "firebase";
            if (id.includes("react")) return "react";
            if (id.includes("@tanstack")) return "tanstack";
            if (id.includes("zod")) return "zod";
            return "vendor";
          }
        },
      },
    },
    sourcemap: true,
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
