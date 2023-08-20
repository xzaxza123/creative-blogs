const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.plugin("provide").use(webpack.ProvidePlugin, [
        {
          $: "jquery",
          jquery: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery",
        },
      ]);
    }
  },

})
