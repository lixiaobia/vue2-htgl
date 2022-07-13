const { defineConfig } = require('@vue/cli-service')
const setting = require('./src/setting')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = setting.title
      return args
    })
  }
})
