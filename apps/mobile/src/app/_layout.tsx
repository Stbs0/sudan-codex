import "react-native-reanimated";
import "../../global.css";
import "../lib/i18next";

import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as Network from "expo-network";
import { SplashScreen, Stack, useNavigationContainerRef } from "expo-router";
import * as SQLite from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import mobileAds, { AppOpenAd, TestIds } from "react-native-google-mobile-ads";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaListener } from "react-native-safe-area-context";
import { Toaster } from "sonner-native";
import { Uniwind, useUniwind } from "uniwind";

import { useAnalyticsPosthog } from "@/hooks/analytics";
import { useAuth } from "@/hooks/useAuth";
import { NAV_THEME } from "@/lib/theme";
import { AuthProvider } from "@/providers/AuthProvider";
import PHProvider from "@/providers/PHProvider";

SplashScreen.preventAutoHideAsync();
AppOpenAd.createForAdRequest(TestIds.APP_OPEN);

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
const DATABASE_NAME = "dev.db";

export default function RootLayout() {
  return (
    <SQLite.SQLiteProvider
      databaseName={DATABASE_NAME}
      options={{ enableChangeListener: true }}
      assetSource={{
        assetId: require("@/assets/data/dev.db"),
      }}>
      <PHProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RootLayoutNav />
          </AuthProvider>
        </QueryClientProvider>
      </PHProvider>
    </SQLite.SQLiteProvider>
  );
}

function RootLayoutNav() {
  useAnalyticsPosthog();

  const { data, isPending } = useAuth();
  const { theme } = useUniwind();
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  const { t } = useTranslation();

  useEffect(() => {
    if (isPending) {
      return;
    }

    SplashScreen.hideAsync();
  }, [isPending]);

  useEffect(() => {
    mobileAds()
      .initialize()
      .then((_adapterStatuses) => {
        // Initialization complete!
      });
  }, []);

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
      <KeyboardProvider>
        <SafeAreaListener
          onChange={({ insets }) => {
            Uniwind.updateInsets(insets);
          }}>
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
                    options={{ title: t("about.title"), headerShown: true }}
                  />
                </Stack.Protected>
                {/* began tabs  */}
                {/* began check if complete profile */}
                <Stack.Protected
                  guard={data?.user?.isProfileComplete === false}>
                  <Stack.Screen name='user-info' />
                </Stack.Protected>
                {/* end check if complete profile */}
              </Stack.Protected>
            </Stack>
            <Toaster />
            <PortalHost />
          </ThemeProvider>
        </SafeAreaListener>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
