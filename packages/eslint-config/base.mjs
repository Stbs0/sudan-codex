import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import turboConfig from "eslint-config-turbo/flat";

export default defineConfig([
  ...turboConfig,

  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  globalIgnores(["**/dist/**", "**/.turbo/**"]),
]);
