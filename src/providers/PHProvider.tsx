import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (
  import.meta.env.PROD &&
  import.meta.env.VITE_PUBLIC_POSTHOG_KEY &&
  import.meta.env.VITE_PUBLIC_POSTHOG_HOST
) {
  posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
    defaults: "2025-05-24",
  });
} else {
  posthog.opt_in_capturing();
}
export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
