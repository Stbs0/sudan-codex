import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2025-05-24",
  opt_out_capturing_by_default: true,
});
export function PHProvider({ children }: { children: React.ReactNode }) {
  if (import.meta.env.DEV) return children;

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
