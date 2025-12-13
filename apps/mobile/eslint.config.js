const { defineConfig, globalIgnores } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const reactCompiler = require("eslint-plugin-react-compiler");

module.exports = defineConfig([
  expoConfig,
  reactCompiler.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*"],
  },
  globalIgnores([".expo/**/*", "node_modules/**/*"]),
]);
