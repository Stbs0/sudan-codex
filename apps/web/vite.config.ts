/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, PluginOption } from "vite";

const InjectCssAfterIndex = () => {
  return {
    name: "move-css-link",
    transformIndexHtml(html: string) {
      const cssRegex =
        /<link rel="stylesheet" crossorigin href="\/assets\/index-.*?\.css">/;
      const cssMatch = html.match(cssRegex);

      if (!cssMatch) return html;
      const cssTag = cssMatch[0];

      let newHtml = html.replace(cssTag, "");

      newHtml = newHtml.replace(
        /(src="\/assets\/index-.*?\.js"><\/script>)/,
        `$1\n    ${cssTag}`
      );

      return newHtml;
    },
  };
};

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./__tests__/vitest-setup.ts",
  },
  envDir: "../../envDir",
  plugins: [
    react(),
    tailwindcss(),
    InjectCssAfterIndex(),

    process.env.analyze === "true" &&
      (visualizer({
        // sourcemap: true,
        template: "network",
        open: true,
        gzipSize: true,
        brotliSize: true,
      }) as PluginOption),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          {
            if (id.includes("node_modules")) {
              if (id.includes("firebase/auth")) return "firebase-auth";
              if (id.includes("firebase/util")) return "firebase-util";

              if (id.includes("react-router")) return "react-router";
              if (id.includes("posthog")) return "posthog";
              if (id.includes("axios")) return "axios";
              if (id.includes("sonner")) return "sonner";
              if (id.includes("tailwind-merge")) return "tailwind-merge";
              if (id.includes("react-dom-client")) return "react-dom-client";
              if (id.includes("dexie")) return "dexie";
              if (id.includes("firebase/firestore"))
                return "firebase-firestore";

              if (id.includes("firebase")) return "firebase";
              if (id.includes("@tanstack")) return "tanstack";
            }
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
