import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginNode from "eslint-plugin-node";

export default tseslint.config(
  { ignores: ["dist", "build", "node_modules"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,js}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      node: eslintPluginNode,
    },
    rules: {
      "no-console": ["warn", { allow: ["info", "warn", "error"] }],
      "no-return-await": "error",
      "no-unused-vars": "off", // TypeScript handles this
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "node/no-missing-import": "off", // TypeScript handles this
      "node/no-unsupported-features/es-syntax": "off", // Allow modern syntax
    },
  }
);
