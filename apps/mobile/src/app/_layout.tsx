import { useAnalyticsPosthog } from "@/hooks/analytics";
import { useAuth } from "@/hooks/useAuth";
import { NAV_THEME } from "@/lib/theme";
import PHProvider from "@/providers/PHProvider";
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
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";

import { AuthProvider } from "@/providers/AuthProvider";
import "react-native-reanimated";
import "../global.css";
import "../lib/i18next";
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

onlineManager.setEventListener((setOnline) => {
  const eventSubscription = Network.addNetworkStateListener((state) => {
    setOnline(!!state.isConnected);
  });
  return eventSubscription.remove;
});

export { ErrorBoundary } from "expo-router";
export const unstable_settings = {
  initialRouteName: "(tabs)/drug-list/index",
};
export default function RootLayout() {
  return (
    <PHProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
      </QueryClientProvider>
    </PHProvider>
  );
}

function RootLayoutNav() {
  useAnalyticsPosthog();
  const { data, isPending } = useAuth();
  const { colorScheme } = useColorScheme();
  const navigationRef = useNavigationContainerRef();

  useReactNavigationDevTools(navigationRef);
  useEffect(() => {
    if (isPending) {
      return;
    }

    SplashScreen.hideAsync();
  }, [isPending]);
  console.log("isPending", isPending);
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
      <ThemeProvider
        value={NAV_THEME[colorScheme === "dark" ? "dark" : "light"]}>
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
              <Stack.Screen name='stats' />
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
