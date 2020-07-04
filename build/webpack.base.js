const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

const { resolve, getPeerFileList } = require("./utils");

const { outputDir, alias } = require("./config");

const isDev = process.env.NODE_ENV === "development";

// 基础配置
const baseConfig =
{
    mode: process.env.NODE_ENV || "production",
    entry: resolve("src/main.ts"),
    resolve:
    {
        // 省略常用文件后缀名
        extensions: [".ts", ".js"],
        // 配置路径别名
        alias:
        {
            // 示例："src": path.resolve(__dirname, "../src")
            ...alias
        },
        // 模块的存放目录
        modules: [resolve("src"), resolve("node_modules")]
    },
    output:
    {
        path: outputDir,                                // 输出目录
        filename: "js/[name].[hash:5].js",              // 输出文件命名
        chunkFilename: "js/[name].[hash:5].chunk.js",   // 输出chunk文件命名
        publicPath: ""                                  // 静态资源引入路径统一切换
    },
    module:
    {
        rules:
        [
            {
                test: /\.css$/,
                use:
                [
                    isDev ? "style-loader" :
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:
                        {
                            publicPath: "../" // 根据 url-loader 输出路径调整实际引入路径
                        }
                    },
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                use:
                [
                    isDev ? "style-loader" :
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:
                        {
                            publicPath: "../" // 根据 url-loader 输出路径调整实际引入路径
                        }
                    },
                    "css-loader",
                    "postcss-loader",
                    "less-loader",
                    {
                        loader: "style-resources-loader", // 配置less全局变量
                        options:
                        {
                            patterns:
                            [
                                resolve("src/styles/base/variables.less"),
                                resolve("src/styles/base/mixins.less")
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp|cur)$/,
                use:
                {
                    loader: "url-loader",
                    options:
                    {
                        name: "[name].[ext]",   // 文件名
                        outputPath: "imgs",     // 输出路径
                        limit: 10240,           // 小于10KB的图片转Base64
                        esModule: false         // 模块化
                    }
                }
            },
            {
                test: /\.(mp3|wav|ogg)$/,
                use:
                {
                    loader: "file-loader",
                    options:
                    {
                        name: "[name].[ext]",  // 文件名
                        outputPath: "audios",  // 输出路径
                        esModule: false        // 模块化
                    }
                }
            },
            {
                test: /\.mp4$/,
                use:
                {
                    loader: "file-loader",
                    options:
                    {
                        name: "[name].[ext]",  // 文件名
                        outputPath: "videos",  // 输出路径
                        esModule: false        // 模块化
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use:
                {
                    loader: "file-loader",
                    options:
                    {
                        name: "[name].[ext]",  // 文件名
                        outputPath: "fonts",   // 输出路径
                        esModule: false        // 模块化
                    }
                }
            },
            {
                test: /\.(js|ts)$/,
                include: resolve("src"),
                use:
                [
                    "cache-loader",   // 性能优化：缓存编译结果
                    "thread-loader",  // 性能优化：多进程编译
                    "babel-loader"
                ]
            }
        ]
    },
    plugins:
    [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{
            from: resolve("public"),  // 复制
            to: outputDir,            // 粘贴
            ignore: isDev ? ["index.html"] : ["index.html", "static/dll/*"] // 忽略 (生产环境下dll目录的拷贝交给`DllReferencePlugin`来执行)
        }]),
        new HtmlWebpackPlugin({
            template: resolve("public/index.html"),
            filename: "index.html" // output.path 目录下输出
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:5].css",
            chunkFilename: "css/[name].[contenthash:5].css"
        }),
        // 动态引入 dll 映射文件
        ...getPeerFileList("public/static/dll/*.json").map(filepath =>
        {
            return new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require(filepath)
            })
        }),
        // 将 dll 注入到生成的 html 中
        new AddAssetHtmlPlugin({
            filepath: resolve("public/static/dll/*.js"),  // dll文件位置
            publicPath: "/static/dll",                    // dll 引用路径
            outputPath: "/static/dll"                     // dll 最终输出的目录
        }),
        new webpack.optimize.ModuleConcatenationPlugin() // 体积优化：作用域提升(scope hoisting)
    ]
};

module.exports = baseConfig;
