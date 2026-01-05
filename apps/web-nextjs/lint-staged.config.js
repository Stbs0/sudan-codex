// eslint-disable-next-line import/no-anonymous-default-export
export default {
  "**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],

  "**/*.{json,md,yaml}": "prettier --write",

  "apps/web-nextjs/**": "secretlint",
  "**/*.ts?(x)": () => "tsc -p ./tsconfig.json --noEmit",
};
