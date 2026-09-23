const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier/flat');

module.exports = defineConfig([
  {
    ignores: ['.expo/**', 'dist/**', 'web-build/**', 'expo-env.d.ts'],
  },
  expoConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-require-imports': [
        'warn',
        {
          allow: [
            '\\.(aac|aiff|avif|bmp|caf|db|gif|heic|html|jpeg|jpg|json|m4a|m4v|mov|mp3|mp4|mpeg|mpg|otf|pdf|png|psd|svg|ttf|wav|webm|webp|xml|yaml|yml|zip)$',
            '\\.woff2$',
          ],
        },
      ],
    },
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
            'unknown',
          ],
          pathGroups: [
            { pattern: 'react', group: 'builtin', position: 'before' },
            { pattern: 'react/**', group: 'builtin', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'object'],
          warnOnUnassignedImports: true,
        },
      ],
    },
  },
  prettierConfig,
]);
