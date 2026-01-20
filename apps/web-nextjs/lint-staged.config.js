// eslint-disable-next-line import/no-anonymous-default-export
export default {
  "**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "apps/web-nextjs/**/*.{js,jsx,ts,tsx}": () =>
    "tsc -p ./tsconfig.json --noEmit",

  "**/*.{json,md,yaml}": "prettier --write",

  "apps/web-nextjs/**": "secretlint",
};
