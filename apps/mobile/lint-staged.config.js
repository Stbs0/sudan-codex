export default {
  "**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],

  "**/*.{json,md,yaml}": "prettier --write",

  "*": ["bunx secretlint"],
  "**/*.ts?(x)": () => "tsc -p tsconfig.json --noEmit",
};
