// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

// Import rules that keep the folder structure in .claude/rules/folder-structure.md.
const baseImportPatterns = [
  {
    group: ['@/features/*/*'],
    message: 'Import a feature only through its public index: @/features/<name>.',
  },
  {
    group: ['../../*'],
    message: 'Use the @/ alias instead of deep relative imports.',
  },
];

const sharedFolders = [
  'components',
  'config',
  'constants',
  'hooks',
  'providers',
  'services',
  'store',
  'types',
  'utils',
];

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*', '.expo/*', 'example/*'],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'no-restricted-imports': ['error', { patterns: baseImportPatterns }],
    },
  },
  {
    // Shared code must never depend on features or routes.
    files: sharedFolders.map((folder) => `src/${folder}/**/*.{ts,tsx}`),
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            ...baseImportPatterns,
            {
              group: ['@/features', '@/features/*', '@/app', '@/app/*'],
              message: 'Shared code must not import from features or routes.',
            },
          ],
        },
      ],
    },
  },
]);
