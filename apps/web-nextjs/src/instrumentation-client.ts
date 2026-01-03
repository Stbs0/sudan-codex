import posthog from "posthog-js";
const isDev = process.env.NODE_ENV === "development";
if (!isDev) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    console.warn("PostHog key not configured");
  } else {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: "2025-05-24",
    });
  }
}
