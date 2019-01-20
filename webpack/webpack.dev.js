const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./config');

// webpack 只是为构建的代码提供了 NODE_ENV 的环境变量，而在此处它还是空的，所以需要显示赋值
process.env.NODE_ENV = 'development';

module.exports = {
  mode: 'development',
  output: {
    path: path.join(__dirname, '../dist', config.baseUrl),
    filename: '[name].js',
    publicPath: config.baseUrl
  },
  devtool: config.dev.devtool,
  devServer: {
    host: 'localhost',
    port: 8080,
    compress: false, // 是否启用 gzip 压缩
    open: false, // 是否自动打开浏览器
    overlay: { // 是否在出现报错或警告时显示蒙层
      warnings: false,
      errors: true
    },
    hot: true, // 模块热替换HMR
    quiet: true, // 终端安静
    clientLogLevel: 'warning', // 浏览器控制台安静
    disableHostCheck: true, // 允许使用如 ngrok 这类的内网转发工具
    historyApiFallback: { // 支持 HTML5 History API
      disableDotRule: true,
      rewrites: [
        {
          from: /./,
          to: path.posix.join(config.baseUrl, 'index.html')
        }
      ]
    },
    proxy: config.dev.proxy
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 模块热替换
    new HtmlWebpackPlugin({
      template: 'index.html',
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
          cdn: config.dev.cdn
        });
      }
    }),
    new CopyWebpackPlugin([
      {
        from: 'public',
        to: ''
      }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BASE_URL: JSON.stringify(config.baseUrl)
      }
    })
  ],
  externals: config.dev.externals
};
