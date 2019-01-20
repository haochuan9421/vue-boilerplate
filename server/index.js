const path = require('path');
const chalk = require('chalk');
const express = require('express');
const history = require('connect-history-api-fallback');
const compression = require('compression');
const { Random } = require('mockjs');

const config = require('../webpack/config');

const app = express();

// 提供一个简单的接口，既可以用于校验开发时 devServer 的 proxy 是否已经成功的代理了跨域请求，也是给构建后的网站提供一个非跨域的接口
app.get('/users/list', function(req, res) {
  const count = req.query.count || 10;
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      'id': i,
      'name': Random.cname(),
      'city': Random.city(true)
    });
  }

  res.json({
    code: 200,
    data: users,
    msg: '成功'
  });
});

// 启用 gzip 压缩
app.use(compression());

// 支持 HTML5 History API，匹配任何不包含 . 的请求，并重定向到 index.html
app.use(history({
  rewrites: [
    {
      from: new RegExp('^((?!\\.).)*$'),
      to: path.posix.join(config.baseUrl, 'index.html')
    }
  ]
}));

// 指定托管的前端静态资源目录
app.use(express.static(path.resolve(__dirname, '../dist')));

// 监听 3000 端口，启动后端服务
app.listen(3000, function() {
  console.log(chalk.green('启动成功：'), chalk.underline(`http://localhost:3000${config.baseUrl}`));
});
