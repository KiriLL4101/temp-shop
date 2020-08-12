const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

const filename = (ext) => (!isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

module.exports = {
  mode: "development",
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    port: 7700
  },
};
