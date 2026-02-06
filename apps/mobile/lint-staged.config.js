export default {
  "**/*.{js,jsx,ts,tsx}": ["oxlint --fix", "oxfmt --write"],
  "**/*.{json,md,yaml}": "oxfmt --write",

  "apps/mobile/**": "secretlint",
  "apps/mobile/**/*.{js,jsx,ts,tsx}": () =>
    "tsc -p apps/mobile/tsconfig.json --noEmit",
};
