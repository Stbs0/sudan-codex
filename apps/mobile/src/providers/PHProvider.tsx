import { PostHog, PostHogProvider } from "posthog-react-native";
import React from "react";

export const posthog = new PostHog(
  process.env.EXPO_PUBLIC_POSTHOG_API_PROJECT!,
  {
    host: "https://eu.i.posthog.com",
    disabled: process.env.NODE_ENV === "development",
  }
);
const PHProvider = ({ children }: { children: React.ReactNode }) => {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

export default PHProvider;
