import { useAnalyticsPosthog } from "@/hooks/analytics";
import { useAuth } from "@/hooks/useAuth";
import { NAV_THEME } from "@/lib/theme";
import { AuthProvider } from "@/providers/AuthProvider";
import PHProvider from "@/providers/PHProvider";
import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import * as Sentry from "@sentry/react-native";
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as Network from "expo-network";
import { SplashScreen, Stack, useNavigationContainerRef } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { Suspense, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Toaster } from "sonner-native";
import { useUniwind } from "uniwind";
import "../../global.css";
import "../lib/i18next";

import * as Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
// SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  // enabled: process.env.NODE_ENV === "production",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const queryClient = new QueryClient();
onlineManager.setEventListener((setOnline) => {
  const eventSubscription = Network.addNetworkStateListener((state) => {
    setOnline(!!state.isConnected);
  });
  return eventSubscription.remove;
});

export { ErrorBoundary } from "expo-router";
// export const unstable_settings = {
//   initialRouteName: "(tabs)/drug-list/index",
// };
Sentry.captureMessage("constants", { extra: { constants: Constants } });
export function RootLayout() {
  return (
    <Suspense fallback={<ActivityIndicator size='large' />}>
      <SQLite.SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        assetSource={{
          assetId: require("@/assets/data/dev.db"),
        }}
        useSuspense>
        <PHProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <RootLayoutNav />
            </AuthProvider>
          </QueryClientProvider>
        </PHProvider>
      </SQLite.SQLiteProvider>
    </Suspense>
  );
}
const DATABASE_NAME = "dev.db";

function RootLayoutNav() {
  useAnalyticsPosthog();

  const { data, isPending } = useAuth();
  const { theme } = useUniwind();
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  Sentry.captureMessage("isPending", { tags: { isPending } });
  Sentry.captureMessage("data", {
    extra: {
      auth: data,
    },
  });
  useEffect(() => {
    if (isPending) {
      return;
    }

    SplashScreen.hideAsync();
  }, [isPending]);
  if (isPending) {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  // console.log("isPending", isPending);
  // console.log("data", data);
  // console.log("gaurde complate", data === null);
  // console.log(
  //   "gaurde auth",
  //   data !== null && data.user?.isProfileComplete === false
  // );
  // console.log(
  //   "gaurde tabs",
  //   data !== null && data.user?.isProfileComplete === false && !isSignedIn
  // );
  // // if (isPending) {
  // // if (isPending) {
  // //   return null;
  // //   return null;
  // // }
  return (
    <GestureHandlerRootView>
      <ThemeProvider value={NAV_THEME[theme === "dark" ? "dark" : "light"]}>
        <StatusBar />
        <Stack screenOptions={{ headerShown: false }}>
          {/* began auth */}
          <Stack.Protected guard={data === null}>
            <Stack.Screen name='auth' />
          </Stack.Protected>
          {/* end auth */}

          <Stack.Protected guard={data !== null}>
            {/* began tabs  */}
            <Stack.Protected guard={data?.user?.isProfileComplete === true}>
              <Stack.Screen name='(tabs)' />
              <Stack.Screen
                name='about'
                options={{ title: "About", headerShown: true }}
              />
            </Stack.Protected>
            {/* began tabs  */}
            {/* began check if complete profile */}
            <Stack.Protected guard={data?.user?.isProfileComplete === false}>
              <Stack.Screen name='user-info' />
            </Stack.Protected>
            {/* end check if complete profile */}
          </Stack.Protected>
        </Stack>
        <PortalHost />
        <Toaster />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
export default Sentry.wrap(RootLayout);
