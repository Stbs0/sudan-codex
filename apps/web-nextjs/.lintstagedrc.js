// .lintstagedrc.js
// See https://nextjs.org/docs/basic-features/eslint#lint-staged for details
/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => `"${f}"`).join(" ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, "prettier --write"],
};
