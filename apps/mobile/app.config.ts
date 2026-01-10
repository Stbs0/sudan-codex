import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Sudan Codex",
  slug: "sudancodex",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/icons/adaptive-icon.png",
  scheme: "sudancodexmobile",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  splash: {
    image: "./src/assets/icons/splash-icon-light.png",
    resizeMode: "contain",
    backgroundColor: "#232323",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "app.sudancodex.mobile",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/icons/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    softwareKeyboardLayoutMode: "resize",
    package: "app.sudancodex.mobile",
  },

  web: {
    bundler: "metro",
    output: "static",
    favicon: "",
  },
  plugins: [
    "expo-router",
    [
      "expo-localization",
      {
        supportedLocales: {
          android: ["en", "ar"],
          ios: ["en", "ar"],
        },
      },
    ],
    [
      "@sentry/react-native/expo",
      {
        url: "https://sentry.io/",
        project: "sudan-codex",
        organization: "mohammed-ibrahim-mahmoud",
      },
    ],
    [
      "expo-splash-screen",
      {
        backgroundColor: "#232323",
        image: "./src/assets/icons/splash-icon-light.png",
        dark: {
          image: "./src/assets/icons/splash-icon-dark.png",
          backgroundColor: "#000000",
        },
        imageWidth: 200,
      },
    ],
    "expo-font",
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
    autolinkingModuleResolution: true,
  },
  owner: "stbs0",
  extra: {
    router: {},
    supportsRTL: true,
    eas: {
      projectId: "df521420-8fc5-4677-83b6-54c8171edc1e",
    },
  },
});
