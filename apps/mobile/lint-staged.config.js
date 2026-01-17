export default {
  "**/*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write",
    () => "tsc -p ./tsconfig.json --noEmit",
  ],

  "**/*.{json,md,yaml}": "prettier --write",

  "apps/mobile/**": "secretlint",
};
