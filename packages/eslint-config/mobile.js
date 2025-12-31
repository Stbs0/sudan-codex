import baseConfig from "./base.mjs";

import expoConfig from "eslint-config-expo/flat.js";
import reactCompiler from "eslint-plugin-react-compiler";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  expoConfig,

  reactCompiler.configs.recommended,

  globalIgnores([".expo/**/*", "node_modules/**/*"]),
  ...baseConfig,
]);
