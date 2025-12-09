import { useAnalyticsPosthog } from "@/hooks/analytics";
import { useAuth } from "@/hooks/useAuth";
import { NAV_THEME } from "@/lib/theme";
import { AuthProvider } from "@/providers/AuthProvider";
import PHProvider from "@/providers/PHProvider";
import { connectAuthEmulator, getAuth } from "@react-native-firebase/auth";
import {
  connectFirestoreEmulator,
  getFirestore,
} from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as Network from "expo-network";
import { SplashScreen, Stack } from "expo-router";
import * as SQLite from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import React, { useEffect } from "react";
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

if (__DEV__) {
  connectAuthEmulator(getAuth(), "http://192.168.1.100:9099");
  connectFirestoreEmulator(getFirestore(), "192.168.1.100", 8080);
}

export { ErrorBoundary } from "expo-router";

if (__DEV__ && !process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID) {
  console.warn(
    "EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID is not set. Google Sign-In may fail.",
  );
}
GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || "",
});

export default function RootLayout() {
  return (
    <PHProvider>
      <QueryClientProvider client={queryClient}>
        <SQLite.SQLiteProvider
          databaseName="mergedDrug.db"
          assetSource={{
            assetId: require("../assets/data/mergedDrug.db"),
            forceOverwrite: true,
          }}
        >
          <AuthProvider>
            <RootLayoutNav />
          </AuthProvider>
        </SQLite.SQLiteProvider>
      </QueryClientProvider>
    </PHProvider>
  );
}

function RootLayoutNav() {
  const { user, userLoading } = useAuth();
  const { colorScheme } = useColorScheme();
  useAnalyticsPosthog();
  useEffect(() => {
    if (userLoading) {
      return;
    }

    // SplashScreen.hideAsync();

    // Debounce combined loading state to prevent UI flicker
    // see: https://github.com/Stbs0/sudancodex-mobile/pull/15
  }, [userLoading]);

  if (userLoading) {
    return null;
  }

  return (
    <ThemeProvider value={NAV_THEME[colorScheme === "dark" ? "dark" : "light"]}>
      <StatusBar />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={user?.profileComplete === true}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="about"
            options={{ title: "About", headerShown: true }}
          />
        </Stack.Protected>
        <Stack.Protected guard={user?.profileComplete === false}>
          <Stack.Screen name="complete-profile" />
        </Stack.Protected>
        <Stack.Protected guard={user === undefined}>
          <Stack.Screen name="auth" />
        </Stack.Protected>
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}
