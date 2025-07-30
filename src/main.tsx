import { Options, scan } from "react-scan"; // must be imported before React and React DOM

import { PostHogConfig } from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const options: Partial<PostHogConfig> = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2025-05-24",
  capture_pageleave: true,
  capture_heatmaps: true,
  capture_pageview: true,
};
const reactScanOptions: Options = {
  enabled: import.meta.env.DEV ? true : false,
};
scan(reactScanOptions);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY!}
      options={options}>
      <App />
    </PostHogProvider>
  </StrictMode>
);
