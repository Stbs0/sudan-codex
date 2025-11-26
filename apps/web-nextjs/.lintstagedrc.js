// .lintstagedrc.js
// See https://nextjs.org/docs/basic-features/eslint#lint-staged for details
/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => `"${f}"`).join(" ")}`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, "prettier --write"],
};
