/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, PluginOption } from "vite";

export default defineConfig({
  // test: {
  //   environment: "jsdom",
  //   setupFiles: "./__tests__/vitest-setup.ts",
  // },
  
  envDir: "./envDir",
  plugins: [
    react(),
    tailwindcss(),

    process.env.analyze === "true" &&
      (visualizer({
        // sourcemap: true,
        open: true,
        gzipSize: true,
        brotliSize: true,
      }) as PluginOption),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        advancedChunks: {
          groups: [
            {
              name: "react",
              // Matches React core
              test: /node_modules\/react\//,
            },
            {
              name: "react-dom",
              // Matches ReactDOM + client/runtime
              test: /node_modules\/react-dom\//,
            },
            {
              name: "scheduler",
              test: /node_modules\/scheduler\//,
            },
            { name: "firebase-auth", test: /node_modules\/firebase\/auth/ },
            {
              name: "firebase-firestore",
              test: /node_modules\/firebase\/firestore/,
            },
            {
              name: "firebase",
              test: /node_modules\/firebase(?!\/auth|\/firestore)/,
            },

            { name: "react-router", test: /node_modules\/react-router/ },
            { name: "dexie", test: /node_modules\/dexie/ },
            { name: "posthog", test: /node_modules\/posthog/ },
            { name: "tanstack", test: /node_modules\/@tanstack/ },
            { name: "zod", test: /node_modules\/zod/ },
            { name: "axios", test: /node_modules\/axios/ },

            { name: "vendor", test: /node_modules/ }, // catch-all for other node_modules
          ],
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
