import { PostHog } from "posthog-node";

let posthogInstance: PostHog | null = null;

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
      flushAt: 1,
      flushInterval: 0,
    });
  }

  return posthogInstance;
}
