const { defineConfig } = require("@vue/cli-service");
const ESLintPlugin     = require("eslint-webpack-plugin");
const webpack          = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("eslint").use(ESLintPlugin, []);
  },
<<<<<<< HEAD
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    ],
  },
});
