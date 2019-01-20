module.exports = {
  'root': true,
  'env': {
    'node': true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  'rules': {
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1
      }
    ],
    'comma-dangle': ['error', 'never'],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'no-console': [
      'off',
      'always'
    ],
    'eol-last': [
      'error',
      'always'
    ],
    'space-before-blocks': [
      'error',
      'always'
    ],
  },
  'parserOptions': {
    'parser': 'babel-eslint'
  }
}