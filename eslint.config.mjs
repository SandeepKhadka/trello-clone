import globals from "globals";
import pluginJs from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Common configuration for JavaScript and TypeScript files
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    plugins: {
      prettier: prettierPlugin,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Includes basic ESLint rules
      ...tsPlugin.configs.recommended.rules, // Includes TypeScript-specific rules
      "prettier/prettier": "error", // Prettier integration
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
];
