/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, type PluginOption } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./__tests__/vitest-setup.ts",
  },
  envDir: "./envDir",
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ sourcemap: true }),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.ico", "logo192.png", "logo512.png"],
      manifest: {
        name: "Sudan Codex",
        short_name: "SudanCodex",
        description:
          "Sudan Codex allows you to effortlessly search through Sudan's comprehensive drug index. Find drug information, generic names, and manufacturers quickly and accurately.",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        start_url: "/",

        icons: [
          {
            src: "logo192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "logo512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    }),
    process.env.analyze === "true" &&
      (visualizer({ sourcemap: true, open: true }) as PluginOption),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("firebase/auth")) return "firebase-auth";
            if (id.includes("react-router")) return "react-router";
            if (id.includes("posthog")) return "posthog";
            if (id.includes("react-dom-client")) return "react-dom-client";
            if (id.includes("dexie")) return "dexie";
            if (id.includes("firebase/firestore")) return "firebase-firestore";
            if (id.includes("firebase")) return "firebase";
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
