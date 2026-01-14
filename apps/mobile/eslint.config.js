import config from "@sudan-codex/eslint-config/mobile";
import { defineConfig } from "eslint/config";
import testingLibrary from "eslint-plugin-testing-library";

export default [
  ...config,
  {
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    plugins: {
      "testing-library": testingLibrary,
    },
    rules: {
      ...testingLibrary.configs.react.rules,
    },
  },
];
