import baseConfig from "./base.mjs";

import expoConfig from "eslint-config-expo/flat.js";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  expoConfig,

  reactHooks.configs.flat["recommended-latest"],
  globalIgnores([".expo/**/*", "node_modules/**/*"]),
  ...baseConfig,
]);
