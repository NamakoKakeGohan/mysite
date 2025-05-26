module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: ["plugin:vue/vue3-recommended", "eslint:recommended"],
  parserOptions: {
    parser: "@babel/eslint-parser",
    ecmaVersion: 2021,
    sourceType: "module",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off", // 必要に応じてルールを調整
  },
};
