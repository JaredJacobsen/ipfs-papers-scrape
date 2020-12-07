const path = require("path");

module.exports = {
  // entry: ["babel-polyfill", "./test.js"],
  devtool: "cheap-module-source-map",
  // mode: "development",
  entry: {
    main: "./src/index.js",
    // content_script: "./src/content_script.js"
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
  resolve: {
    alias: {
      stream: "stream-browserify",
      util: "util",
      url: "url",
      assert: "assert",
    },
  },
  // resolve: {
  //   fallback: {
  //     util: require.resolve("util/"),
  //     url: require.resolve("url/"),
  //     stream: require.resolve("stream-browserify"),
  //     assert: require.resolve("assert/"),
  //   },
  // },
  // node: {
  //   fs: "empty",
  //   net: "empty",
  //   tls: "empty",
  // },
  watch: true,
};
