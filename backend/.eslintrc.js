module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['jest', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    camelcase: 'off',
    'class-methods-use-this': 'off',
    'comma-dangle': ['error', 'never'],
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'prettier/prettier': 'error'
  }
};
