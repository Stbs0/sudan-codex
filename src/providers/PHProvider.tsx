import { PostHogConfig } from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

const options: Partial<PostHogConfig> = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2025-05-24",
  capture_pageleave: true,
  capture_heatmaps: true,
  capture_pageview: true,
};
export function PHProvider({ children }: { children: React.ReactNode }) {
  if (import.meta.env.NODE_ENV !== "production") return children;
  return (
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY!}
      options={options}>
      {children}
    </PostHogProvider>
  );
}

