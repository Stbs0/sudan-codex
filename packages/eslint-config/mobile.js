import baseConfig from "./base.mjs";

import expoConfig from "eslint-config-expo/flat.js";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  expoConfig,

  globalIgnores([".expo/**/*", "node_modules/**/*"]),
  ...baseConfig,
]);
