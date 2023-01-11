'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const name = defaultSettings.title || 'vue Admin Template' // 项目名称
const port = process.env.port || process.env.npm_config_port || 9528 // dev port
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  transpileDependencies: [],
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  // lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    // 代理配置
    proxy: {
      // 这里的api 表示如果我们的请求地址有/api的时候,就出触发代理机制
      // localhost:8888/api/abc  => 代理给另一个服务器
      // 本地的前端  =》 本地的后端  =》 代理我们向另一个服务器发请求 （行得通）
      // 本地的前端  =》 另外一个服务器发请求 （跨域 行不通）
      '/': {
        target: 'http://localhost:3000', // 我们要代理的地址
        secure: false,
        changeOrigin: true, // 是否跨域 需要设置此值为true 才可以让本地服务代理我们发出请求
        // 路径重写
        // pathRewrite: {
        //   // 重新路由  localhost:8888/api/login  => www.baidu.com/api/login
        //   '^/': ''
        // },
        ws: false
      },
    }
  },
  chainWebpack: config => {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
  }
}
