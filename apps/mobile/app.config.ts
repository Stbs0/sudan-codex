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
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/icons/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    googleServicesFile:
      process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
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
    "@react-native-google-signin/google-signin",
    "@react-native-firebase/app",
    "@react-native-firebase/auth",
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
    [
      "expo-sqlite",
      {
        enableFTS: true,
      },
    ],
    "expo-font",
    "expo-web-browser",
    [
      "expo-asset",
      {
        assetPatterns: ["src/assets/data/**/*.db"],
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
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
