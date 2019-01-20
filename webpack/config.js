const dev = {
  devtool: 'cheap-module-eval-source-map',
  // CDN 链接，会直接通过 link 或 script 加载
  cdn: {
    css: [
      'http://at.alicdn.com/t/font_971776_92t7h33g0b.css'
    ],
    js: [

    ]
  },
  // https://webpack.js.org/configuration/externals/#externals
  externals: {},
  // 代理请求，可用来避免本地开发时的跨域问题，https://webpack.js.org/configuration/dev-server/#devserver-proxy
  proxy: {
    '/users': 'http://localhost:3000'
  }
};
const build = {
  devtool: 'source-map',
  // 使用 gzip 压缩的文件后缀
  productionGzipExtensions: ['js', 'css'],
  // 是否开启 SourceMap，这对生产环境下定位报错很有帮助，但会导致打包速度变慢
  productionSourceMap: true,
  // 生产环境下丢弃 console.log()
  productionDropConsole: false,
  // CDN 链接，会直接通过 link 或 script 加载
  cdn: {
    css: [
      'http://at.alicdn.com/t/font_971776_92t7h33g0b.css'
    ],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.5.21/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.0.2/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js'
    ]
  },
  // https://webpack.js.org/configuration/externals/#externals
  externals: {
    'vue': 'Vue',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter',
    'axios': 'axios'
  }
};
module.exports = {
  // 项目部署路径，这对于不是部署在网站根目录下的项目很有用，例如你的项目是在 my-app 文件夹下的，那么可以设置为 /my-app/，左右两边的 / 不能省略，参考 https://cli.vuejs.org/zh/config/#baseurl
  baseUrl: '/',
  dev,
  build
};
