import { PostHog, PostHogProvider } from "posthog-react-native";
import React from "react";

export const posthog = new PostHog(
  process.env.EXPO_PUBLIC_POSTHOG_API_PROJECT!,
  {
    host: "https://eu.i.posthog.com",
    // disabled: process.env.NODE_ENV === "development",
  }
);
const PHProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PostHogProvider
      client={posthog}
      autocapture={{
        captureTouches: true,
        captureScreens: true,
        ignoreLabels: [], // Any labels here will be ignored from the stack in touch events
        customLabelProp: "ph-label",
        maxElementsCaptured: 20,
        noCaptureProp: "ph-no-capture",
        propsToCapture: ["testID"], // Limit which props are captured. By default, identifiers and text content are captured.

        navigation: {
          // By default, only the screen name is tracked but it is possible to track the
          // params or modify the name by intercepting the autocapture like so
          routeToName: (name, params) => {
            if (params.id) return `${name}/${params.id}`;
            return name;
          },
          routeToProperties: (name, params) => {
            if (name === "SensitiveScreen") return undefined;
            return params;
          },
        },
      }}>
      {children}
    </PostHogProvider>
  );
};

export default PHProvider;
