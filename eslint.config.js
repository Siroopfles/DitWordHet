import { defineConfig } from "eslint/config";
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ["**/*.js", "**/*.ts", "**/*.mjs"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        console: true,
        module: true,
        process: true
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'warn',
      'no-unused-vars': 'warn'
    }
  },
  {
    files: ["**/*.test.ts", "**/*.spec.ts"],
    languageOptions: {
      globals: {
        describe: true,
        expect: true,
        it: true,
        jest: true
      }
    }
  },
  prettierConfig,
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**']
  }
]);