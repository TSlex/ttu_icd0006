module.exports = {
  globals: {
    "$": true,
    "jQuery": true
  },
  root: true,
  env: {
    node: true,
    jquery: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-multiple-empty-lines": [2, { "max": 99999, "maxEOF": 0 }],
    'quotes': 'off',
    'semi': 'off',
    'space-before-function-paren': 'off',
    'prefer-const': 'off',
    'spaced-comment': 'off',
    'comma-dangle': 'off',
    'eol-last': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/interface-name-prefix': [
      "error",
      { "prefixWithI": "always" }
    ]
  }
}
