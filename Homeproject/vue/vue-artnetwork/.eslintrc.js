module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    "$": true,
    "jQuery": true
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
    "no-multiple-empty-lines": [2, {"max": 99999, "maxEOF": 0}],
    'quotes': 'off',
    'semi': 'off',
    'space-before-function-paren': 'off',
    'prefer-const': 'off',
    'spaced-comment': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/interface-name-prefix': [
      "error",
      { "prefixWithI": "always" }
    ]
  }
}
