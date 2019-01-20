const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const utils = require('./utils.js');
const config = require('./config');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  context: path.resolve(__dirname, '../'),
  resolve: {
    // 别名
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      '@': resolve('src'),
      'base': resolve('src/base'),
      'views': resolve('src/views')
    },
    // 引入时无需明确指定的文件后缀
    extensions: ['.wasm', '.mjs', '.js', '.jsx', '.vue', '.json']
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/vue-loader')
            }
          },
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              },
              cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/vue-loader')
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV === 'development' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2 // postcss-loader, sass-loader
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: resolve('postcss.config.js')
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              data: utils.getSassVariable([
                resolve('src/styles/color.scss'),
                resolve('src/styles/mixin.scss')
              ])
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/babel-loader')
            }
          },
          {
            loader: 'thread-loader'
          },
          {
            loader: 'babel-loader'
          }
        ],
        // 排除 node_modules 中非 vue 文件
        exclude(file) {
          return /node_modules/.test(file) && !/\.vue\.js/.test(file);
        }
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'public',
        to: path.join(__dirname, '../dist', config.baseUrl),
        toType: 'dir',
        ignore: [
          '.DS_Store'
        ]
      }
    ])
  ]
};
