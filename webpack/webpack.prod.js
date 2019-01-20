const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const config = require('./config');

// webpack 只是为构建的代码提供了 NODE_ENV 的环境变量，而在此处它还是空的，所以需要显示赋值
process.env.NODE_ENV = 'production';

module.exports = {
  mode: 'production',
  output: {
    path: path.join(__dirname, '../dist', config.baseUrl),
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].js',
    publicPath: config.baseUrl
  },
  devtool: config.build.devtool,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: config.build.productionSourceMap,
        uglifyOptions: {
          compress: {
            drop_console: config.build.productionDropConsole
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    runtimeChunk: 'single', // https://webpack.js.org/guides/caching/#extracting-boilerplate
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules(\.nosync)?[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true
      },
      templateParameters: (compilation, assets, pluginOptions) => {
        let stats;
        return Object.assign({
          // make stats lazy as it is expensive
          get webpack() {
            return stats || (stats = compilation.getStats().toJson());
          },
          compilation: compilation,
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            files: assets,
            options: pluginOptions
          }
        }, {
          BASE_URL: config.baseUrl,
          cdn: config.build.cdn
        });
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BASE_URL: JSON.stringify(config.baseUrl)
      }
    }),
    new CompressionWebpackPlugin({
      test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      threshold: 8192,
      minRatio: 0.8
    }),
    new webpack.HashedModuleIdsPlugin() // https://webpack.js.org/guides/caching/#module-identifiers
  ],
  externals: config.build.externals
};
