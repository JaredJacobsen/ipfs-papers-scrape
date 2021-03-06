const path = require("path");
const webpack = require("webpack");
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  // entry: ["babel-polyfill", "./test.js"],
  // devtool: "cheap-module-source-map",
  devtool: "inline-source-map",
  // mode: "development",
  optimization: {
    minimize: false, // <---- disables uglify.
    // minimizer: [new UglifyJsPlugin()] if you want to customize it.
  },
  entry: {
    popup: "./src/popup.js",
    sw: "./src/sw.js",
    scrapeHtmlOrPdf: "./src/scrapeHtmlOrPdf.js",
    googleScholarContentScript: "./src/googleScholarContentScript.js",
    options: "./src/options.js",
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
  node: {
    global: true,
  },
  // externals: ["tls", "net", "fs", "child_process"],
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
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      crypto: require.resolve("crypto-browserify"),
      zlib: require.resolve("browserify-zlib"),
      os: require.resolve("os-browserify/browser"),
      tls: false,
      net: false,
      fs: false,
      child_process: false,
      // tls: require.resolve("tls"),
      // net: require.resolve("net"),
      // fs: require.resolve("fs"),
      // child_process: require.resolve("child_process"),
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
