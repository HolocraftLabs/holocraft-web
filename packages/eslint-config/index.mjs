/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-unused-vars": "off",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
];

export default config;
