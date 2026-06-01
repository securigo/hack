const browserGlobals = {
  Blob: 'readonly',
  URL: 'readonly',
  crypto: 'readonly',
  document: 'readonly',
  Image: 'readonly',
  React: 'readonly',
  TextEncoder: 'readonly',
  atob: 'readonly',
  btoa: 'readonly',
  decodeURIComponent: 'readonly',
  encodeURIComponent: 'readonly',
  escape: 'readonly',
  unescape: 'readonly',
};

export default [
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: browserGlobals,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
    },
  },
];
