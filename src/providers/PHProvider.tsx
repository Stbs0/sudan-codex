import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (
  import.meta.env.PROD &&
  import.meta.env.VITE_PUBLIC_POSTHOG_KEY &&
  import.meta.env.VITE_PUBLIC_POSTHOG_HOST
) {
  posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
    opt_out_capturing_by_default: true,
  });
} else {
  // Ensure nothing is sent if not configured or not in production
  posthog.opt_out_capturing();
}
export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
