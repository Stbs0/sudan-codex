import posthog from "posthog-js";
const isDev = process.env.NODE_ENV === "development" ? true : false;
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  autocapture: !isDev,
  defaults: "2025-05-24",
  disable_session_recording: !isDev,
  opt_out_capturing_by_default: isDev,
});
