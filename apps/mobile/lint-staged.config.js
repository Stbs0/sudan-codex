export default {
  "**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "**/*.{json,md,yaml}": "prettier --write",

  "apps/mobile/**": "secretlint",
  "apps/mobile/**/*.{js,jsx,ts,tsx}": () => "tsc -p ./tsconfig.json --noEmit",
};
