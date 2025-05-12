const { defineConfig } = require("@vue/cli-service");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("eslint").use(ESLintPlugin, [
      {
        // 必要に応じてオプションを追加
      },
    ]);
  },
  devServer: {
    proxy: {
      "/api/steam": {
        target: "https://api.steampowered.com",
        changeOrigin: true,
        pathRewrite: { "^/api/steam": "" },
      },
    },
  },
});
