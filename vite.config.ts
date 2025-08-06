/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./__tests__/vitest-setup.ts",
  },
  optimizeDeps: {
    exclude: ["react-scan"],
  },
  envDir: "./envDir",
  plugins: [
    react(),
    tailwindcss(),
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
  ],
  preview: {
    port: +(process.env.VITE_PREVIEW_PORT || 4173),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
