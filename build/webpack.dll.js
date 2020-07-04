const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const { resolve } = require("./utils")

const { dll } = require("./config");

const dllConfig =
{
    mode: process.env.NODE_ENV || "production",
    entry:
    {
        // 示例：lodash: ["lodash"]
        ...dll
    },
    output:
    {
        path: resolve("public/static/dll"),
        filename: "[name].dll.js",
        library: "[name]" // [name].dll.js 文件暴露出的全局变量名
    },
    plugins:
    [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            name: "[name]",
            path: resolve("public/static/dll/[name]-manifest.json"),
            context: process.cwd()
        }),
        new ProgressBarPlugin(),                          // 编译进度条
        new webpack.optimize.ModuleConcatenationPlugin()  // 体积优化：作用域提升(scope hoisting)
    ],
    // 打印信息控制
    stats:
    {
        modules: false,
        entrypoints: false,
        warnings: false
    }
};

module.exports = dllConfig;
