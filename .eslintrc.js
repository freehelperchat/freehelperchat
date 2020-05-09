module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['plugin:@typescript-eslint/recommended', 'airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'consistent-return': 'off',
    'operator-linebreak': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'object-curly-newline': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
