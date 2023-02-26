const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: "/dist",
    filename: "bundle.js",
  },
  devServer: {
    static: "./dist",
  },
};
