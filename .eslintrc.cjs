module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:svelte/recommended'
  ],
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['*.cjs'],
  overrides: [
    {
      files: ['./**/*.js'],
      parserOptions: { project: null }
    },
    {
      files: ['./**/*.ts'],
      extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking']
    },
    {
      files: ['./**/*.svelte'],
      extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
      parser: 'svelte-eslint-parser',
      parserOptions: { parser: '@typescript-eslint/parser' }
    }
  ],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.svelte'],
    sourceType: 'module',
    ecmaVersion: 2020
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  globals: {
    // See https://github.com/sveltejs/svelte-eslint-parser/issues/306
    $$Generic: 'readonly'
  }
};
