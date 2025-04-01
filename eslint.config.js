import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Basis JavaScript configuratie (zonder TypeScript parser)
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: true,
        module: true,
        process: true
      }
    },
    rules: {
      'prefer-const': 'warn',
      'no-unused-vars': 'warn'
    }
  },

  // TypeScript configuratie met project optie
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json'
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

  // Test bestanden configuratie
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    languageOptions: {
      globals: {
        describe: true,
        expect: true,
        it: true,
        jest: true
      }
    }
  },

  // Prettier configuratie
  prettierConfig,

  // Bestanden die genegeerd moeten worden
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**']
  }
];
