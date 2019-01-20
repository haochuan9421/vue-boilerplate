const path = require('path');
const ora = require('ora');
const rm = require('rimraf');
const chalk = require('chalk');
const webpack = require('webpack');
const merge = require('webpack-merge');

const webpackProdConfig = require('./webpack.prod.js');
const webpackCommonConfig = require('./webpack.common.js');

const webpackConfig = merge(webpackCommonConfig, webpackProdConfig);

const spinner = ora('构建中...');
spinner.start();

rm(path.resolve(webpackConfig.output.path), err => {
  if (err) throw err;
  webpack(webpackConfig, (err, stats) => {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(stats.toString({
      colors: true,
      assetsSort: 'size',
      children: false,
      modules: false,
      entrypoints: false
    }) + '\n\n');

    if (stats.hasErrors()) {
      console.log(chalk.red('构建失败。\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('大功告成！👏 👏 👏 \n'));
  });
});
