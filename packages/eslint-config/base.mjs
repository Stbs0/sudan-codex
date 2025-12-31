import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  globalIgnores([ "**/dist/**", "**/.turbo/**"]),
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
]);
;