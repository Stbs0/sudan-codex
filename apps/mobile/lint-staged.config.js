export default {
  "**/*.{js,jsx,ts,tsx}": ["oxlint --fix", "prettier --write"],
  "**/*.{json,md,yaml}": "prettier --write",

  "apps/mobile/**": "secretlint",
  "apps/mobile/**/*.{js,jsx,ts,tsx}": () =>
    "tsc -p apps/mobile/tsconfig.json --noEmit",
};
