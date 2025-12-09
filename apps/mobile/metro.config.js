// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("cjs", "sql");
// config.resolver.assetExts.push("db");

config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(config, {
  input: "./src/global.css",
  inlineRem: 16,
});
