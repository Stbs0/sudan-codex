import { PostHog, PostHogProvider } from "posthog-react-native";
import React from "react";

const posthog = new PostHog(process.env.EXPO_PUBLIC_POSTHOG_API_PROJECT!, {
  host: "https://eu.i.posthog.com",
});
const PHProvider = ({ children }: { children: React.ReactNode }) => {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

export default PHProvider;
