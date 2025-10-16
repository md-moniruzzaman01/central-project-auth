// eslint.config.mts
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup FlatCompat (optional, for legacy configs)
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  // Optionally include legacy configs (like eslint:recommended)
  ...compat.config({
    extends: ["eslint:recommended"],
  }),

  // Include @typescript-eslint recommended configs
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx,js,jsx,mts,cts}"],
    ignores: ["dist/**", "node_modules/**"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: "latest",
      },
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      prettier: eslintPluginPrettier,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...prettier.rules,

      // ✅ Custom project rules
      eqeqeq: "off",
      "no-unused-vars": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          singleQuote: true,
          semi: true,
          tabWidth: 2,
          trailingComma: "es5",
          printWidth: 100,
        },
      ],
    },
  },
]);
