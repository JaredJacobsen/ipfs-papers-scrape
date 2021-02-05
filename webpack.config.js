const path = require("path");
const webpack = require("webpack");
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  // entry: ["babel-polyfill", "./test.js"],
  // devtool: "cheap-module-source-map",
  // mode: "development",
  entry: {
    popup: "./src/popup.js",
    sw: "./src/sw.js",
    scrapeActiveWindow: "./src/scrapeActiveWindow.js",
    scrapePdf: "./src/scrapePdf.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    // new NodePolyfillPlugin(),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
  ],
  resolve: {
    // modules: [path.resolve("./node_modules")],
    // alias: {
    //   stream: "stream-browserify",
    //   util: "util",
    //   url: "url",
    //   assert: "assert",
    //   process: "process/browser",
    // },
    fallback: {
      util: require.resolve("util/"),
      url: require.resolve("url/"),
      stream: require.resolve("stream-browserify"),
      assert: require.resolve("assert/"),
      path: require.resolve("path-browserify"),
      // process: require.resolve("process/browser"),
    },
    // extensions: [".js", ".jsx", ".json", ".scss"],
    // },
    // node: {
    //   fs: "empty",
    //   net: "empty",
    //   tls: "empty",
  },
  watch: true,
};
