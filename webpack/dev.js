const portfinder = require('portfinder');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const merge = require('webpack-merge');

const webpackDevConfig = require('./webpack.dev');
const webpackCommonConfig = require('./webpack.common');
const config = require('./config');

const webpackConfig = merge(webpackCommonConfig, webpackDevConfig);

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = webpackConfig.devServer.port;
  portfinder.getPort((err, port) => { // 端口占用检测
    if (err) {
      reject(err);
    } else {
      webpackConfig.devServer.port = port;
      webpackConfig.plugins.push(
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: { // 监听构建成功
            messages: [`启动成功: http://${webpackConfig.devServer.host}:${port + config.baseUrl}`]
          }
        })
      );
      resolve(webpackConfig);
    }
  });
});
