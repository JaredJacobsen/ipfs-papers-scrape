module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    chrome: "writable",
    module: "readonly",
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {},
};
