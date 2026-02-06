import "tsx/cjs";

import type { ConfigContext, ExpoConfig } from "expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getBundleIdentifier = () => {
  if (IS_DEV) {
    return "app.sudancodex.mobile.dev";
  }

  if (IS_PREVIEW) {
    return "app.sudancodex.mobile.preview";
  }

  return "app.sudancodex.mobile";
};
const getPackageIdentifier = () => {
  if (IS_DEV) {
    return "com.sudancodex.mobile.dev";
  }

  if (IS_PREVIEW) {
    return "com.sudancodex.mobile.preview";
  }

  return "com.sudancodex.mobile";
};
const getSlug = () => {
  if (IS_DEV) {
    return "sudan-codex-dev";
  }

  if (IS_PREVIEW) {
    return "sudan-codex-preview";
  }

  return "sudancodex";
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
  slug: getSlug(),

  name: getAppName(),
  scheme: getScheme(),

  ios: {
    ...config.ios,
    bundleIdentifier: getBundleIdentifier(),
  },
  android: {
    ...config.android,

    package: getPackageIdentifier(),
  },
});
