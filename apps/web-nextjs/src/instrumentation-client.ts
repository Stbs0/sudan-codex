import posthog from "posthog-js";

const IsDevOrTest =
  process.env.NODE_ENV === "development" ||
  !!process.env.CI ||
  process.env.NODE_ENV === "test";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  defaults: "2025-05-24",
  opt_out_capturing_by_default: IsDevOrTest,
  disable_session_recording: IsDevOrTest,
});
