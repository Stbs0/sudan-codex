import { useGlobalSearchParams, usePathname } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useEffect } from "react";

export const useAnalyticsPosthog = () => {
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const posthog = usePostHog();
  useEffect(() => {
    posthog.screen(pathname, params);
  }, [pathname, params, posthog]);
};
