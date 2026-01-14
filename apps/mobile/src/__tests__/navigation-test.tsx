import { renderRouter, screen } from "expo-router/testing-library";
import React from "react";
import { Text, View } from "react-native";

// Route Mocks - We mock the screen components themselves to verify routing
// rather than testing the internal logic of every screen in this file.
// For `user-info` we can keep the import if checking specific content is desired,
// but consistency might be better. Let's mock them to ensure test stability and focus on ROUTING.

const MockUserInfo = () => (
  <View>
    <Text>User Info Screen</Text>
  </View>
);
const MockAuth = () => (
  <View>
    <Text>Auth Screen</Text>
  </View>
);
const MockAbout = () => (
  <View>
    <Text>About Screen</Text>
  </View>
);
const MockNotFound = () => (
  <View>
    <Text>Not Found Screen</Text>
  </View>
);
const MockTabsLayout = ({ children }: any) => (
  <View>
    <Text>Tabs Layout</Text>
    {children}
  </View>
); // Simplified layout

// Tab Screens
const MockDrugListIndex = () => (
  <View>
    <Text>Drug List Index</Text>
  </View>
);
const MockDrugListSlug = () => (
  <View>
    <Text>Drug Detail Screen</Text>
  </View>
);
const MockTabsIndex = () => (
  <View>
    <Text>Tabs Index</Text>
  </View>
);
// Settings Screens
const MockSettingsIndex = () => (
  <View>
    <Text>Settings Index</Text>
  </View>
);
const MockSettingsAccount = () => (
  <View>
    <Text>Settings Account</Text>
  </View>
);
const MockSettingsAppearance = () => (
  <View>
    <Text>Settings Appearance</Text>
  </View>
);
const MockSettingsHelp = () => (
  <View>
    <Text>Settings Help</Text>
  </View>
);
const MockSettingsStats = () => (
  <View>
    <Text>Settings Stats</Text>
  </View>
);
// Stats nested screens
const MockStatsAgent = () => (
  <View>
    <Text>Stats Agent</Text>
  </View>
);
const MockStatsCompany = () => (
  <View>
    <Text>Stats Company</Text>
  </View>
);
const MockStatsGeneric = () => (
  <View>
    <Text>Stats Generic</Text>
  </View>
);

describe("App Navigation", () => {
  const mockRoutes = {
    // Root level
    "user-info": MockUserInfo,
    auth: MockAuth,
    about: MockAbout,
    "+not-found": MockNotFound,

    // Tabs
    "(tabs)/_layout": MockTabsLayout,
    "(tabs)/index": MockTabsIndex,

    // Drug List Stack
    "(tabs)/drug-list/index": MockDrugListIndex,
    "(tabs)/drug-list/[slug]": MockDrugListSlug,

    // Settings Stack
    "(tabs)/settings/index": MockSettingsIndex,
    "(tabs)/settings/account": MockSettingsAccount,
    "(tabs)/settings/appearance": MockSettingsAppearance,
    "(tabs)/settings/help": MockSettingsHelp,
    "(tabs)/settings/stats": MockSettingsStats,

    // Stats Stack (nested in tabs, presumably accessible)
    "(tabs)/stats/agents/[slug]": MockStatsAgent,
    "(tabs)/stats/companies/[slug]": MockStatsCompany,
    "(tabs)/stats/generics/[slug]": MockStatsGeneric,
  };
  describe("Root level", () => {
    it.each([
      ["/user-info", "user-info", "User Info Screen"],
      ["/auth", "auth", "Auth Screen"],
      ["/about", "about", "About Screen"],
    ])("navigates to %s", async (url, _routeKey, expectedText) => {
      renderRouter(mockRoutes, { initialUrl: url });
      expect(screen).toHavePathname(url);
      expect(screen.getByText(expectedText)).toBeTruthy();
    });
  });

  describe("Drug List Stack", () => {
    it.each([
      ["/drug-list", "(tabs)/drug-list/index", "Drug List Index"],
      ["/drug-list/panadol", "(tabs)/drug-list/[slug]", "Drug Detail Screen"],
    ])("navigates to %s", async (url, routeKey, expectedText) => {
      renderRouter(
        {
          [routeKey]: mockRoutes[routeKey as keyof typeof mockRoutes],
        },
        { initialUrl: url }
      );
      expect(screen).toHavePathname(url);
      expect(screen.getByText(expectedText)).toBeTruthy();
    });
  });

  describe("Settings Stack", () => {
    it.each([
      ["/settings", "(tabs)/settings/index", "Settings Index"],
      ["/settings/account", "(tabs)/settings/account", "Settings Account"],
      [
        "/settings/appearance",
        "(tabs)/settings/appearance",
        "Settings Appearance",
      ],
      ["/settings/help", "(tabs)/settings/help", "Settings Help"],
      ["/settings/stats", "(tabs)/settings/stats", "Settings Stats"],
    ])("navigates to %s", async (url, routeKey, expectedText) => {
      renderRouter(
        {
          [routeKey]: mockRoutes[routeKey as keyof typeof mockRoutes],
        },
        { initialUrl: url }
      );
      expect(screen).toHavePathname(url);
      expect(screen.getByText(expectedText)).toBeTruthy();
    });
  });

  describe("Stats Stack", () => {
    it.each([
      ["/stats/agents/123", "(tabs)/stats/agents/[slug]", "Stats Agent"],
      [
        "/stats/companies/123",
        "(tabs)/stats/companies/[slug]",
        "Stats Company",
      ],
      ["/stats/generics/123", "(tabs)/stats/generics/[slug]", "Stats Generic"],
    ])("navigates to %s", async (url, routeKey, expectedText) => {
      renderRouter(
        {
          [routeKey]: mockRoutes[routeKey as keyof typeof mockRoutes],
        },
        { initialUrl: url }
      );
      expect(screen).toHavePathname(url);
      expect(screen.getByText(expectedText)).toBeTruthy();
    });
  });
});
