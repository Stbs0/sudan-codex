import { PostHog } from "posthog-node";

let posthogInstance: PostHog | null = null;
const IsDevOrTest =
  process.env.NODE_ENV === "development" ||
  !!process.env.CI ||
  process.env.NODE_ENV === "test";

export function getPostHogServer() {
  if (!posthogInstance) {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!posthogKey) {
      throw new Error(
        "NEXT_PUBLIC_POSTHOG_KEY environment variable is required for PostHog server initialization"
      );
    }
    posthogInstance = new PostHog(posthogKey, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      disabled: IsDevOrTest,
      flushAt: 1,
      defaultOptIn: !IsDevOrTest,
      flushInterval: 0,
    });
  }

  return posthogInstance;
}
