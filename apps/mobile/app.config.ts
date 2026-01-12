import type { ConfigContext, ExpoConfig } from "expo/config";
import "tsx/cjs";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getPackageIdentifier = () => {
  if (IS_DEV) {
    return "app.sudancodex.mobile.dev";
  }

  if (IS_PREVIEW) {
    return "app.sudancodex.mobile.preview";
  }

  return "app.sudancodex.mobile";
};
const getAppName = () => {
  if (IS_DEV) {
    return "Sudan Codex (Dev)";
  }

  if (IS_PREVIEW) {
    return "Sudan Codex (Preview)";
  }

  return "Sudan Codex";
};

const getScheme = () => {
  if (IS_DEV) {
    return "sudancodexmobile-dev";
  }

  if (IS_PREVIEW) {
    return "sudancodexmobile-preview";
  }

  return "sudancodexmobile";
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "sudancodex",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/icons/adaptive-icon.png",
  scheme: getScheme(),
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  splash: {
    image: "./src/assets/icons/splash-icon-light.png",
    resizeMode: "contain",
    backgroundColor: "#232323",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: getPackageIdentifier(),
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/icons/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    softwareKeyboardLayoutMode: "resize",
    package: getPackageIdentifier(),
  },

  web: {
    bundler: "metro",
    favicon: "",
  },
  plugins: [
    ["./plugins/withNewHermsPath.ts"],
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
    ["expo-sqlite"],
    [
      "expo-build-properties",
      {
        android: {
          compileSdkVersion: 35,
          targetSdkVersion: 35,
          minSdkVersion: 28,
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
    apiUrl: process.env.EXPO_PUBLIC_BACKEND_URI,
  },
});
