export default {
  "**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],

  "**/*.{json,md,yaml}": "prettier --write",

  "apps/mobile/**": [" secretlint"],
  "**/*.ts?(x)": () => "tsc -p ./tsconfig.json --noEmit",
};
