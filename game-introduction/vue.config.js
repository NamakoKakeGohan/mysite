const { defineConfig } = require("@vue/cli-service");
const ESLintPlugin     = require("eslint-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("eslint").use(ESLintPlugin, []);
  },
  devServer: {
    //開発環境専用
    proxy: {
      "/api/steam" : {
        target      : "https://api.steampowered.com",
        changeOrigin: true,
        pathRewrite : { "^/api/steam": "" },
      },
      "/api/store" : {
        target      : "https://store.steampowered.com",
        changeOrigin: true,
        pathRewrite : { "^/api/store": "" },
      },
    },
  },
});
