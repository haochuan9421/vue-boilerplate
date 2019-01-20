module.exports = {
  'presets': [
    [
      'babel-preset-vue2',
      {
        'jsx': true,
        'polyfills': [
          'es6.array.iterator',
          'es6.promise',
          'es7.promise.finally'
        ],
        'envOptions': {
          'debug': false,
          'targets': [
            '> 1%',
            'last 2 versions',
            'ie >=9'
          ]
        }
      }
    ]
  ]
};
