const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const devConfig = require("./webpack.dev");
const proConfig = require("./webpack.pro");

module.exports = merge(baseConfig, process.env.NODE_ENV === "development" ? devConfig : proConfig);
