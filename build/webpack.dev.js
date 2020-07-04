const webpack = require("webpack");

const { resolve } = require("./utils");

const { outputDir, devServer } = require("./config");

// 开发环境配置 
const devConfig =
{
    devtool: "cheap-module-eval-source-map", // 源码位置映射
    devServer:
    {
        port: 8080,                 // 端口
        open: false,                // 自动打开浏览器
        compress: true,             // gzip压缩
        contentBase: outputDir,     // 服务访问目录
        historyApiFallback: true,   // 404重定向到 index.html
        progress: true,             // 构建进度条 `--progress`
        hot: true,                  // 热替换
        hotOnly: false,             // HMR 构建失败时刷新页面
        inline: true,               // bundle中插入 live reload 及构建信息的相关代码
        clientLogLevel: "none",     // 控制台调试信息
        // 请求代理，可用于解决本地开发浏览器跨域问题
        proxy:
        {
            "/api":
            {
                target: "http://localhost", // 重定向域名或IP地址
                changeOrigin: true, // 当 target 为域名时，需要配置该参数
                secure: false, // https
                // 若不想将`/api`转发过去，可重写
                pathRewrite:
                {
                    "^/api": ""
                }
                // 代理响应事件，这里可以修改响应报文。能解决cookie丢失问题
                // onProxyRes(proxyRes, req, res) {}
            }
        },
        ...devServer
    },
    plugins:
    [
        new webpack.HotModuleReplacementPlugin()
    ],
    output:
    {
        publicPath: "/"
    },
    // 打印信息控制
    stats:
    {
        // 配置文档 https://webpack.docschina.org/configuration/stats/
        assets: false,
        builtAt: false,
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
        chunkOrigins: false,
        entrypoints: false,
        version: false
    }
};

module.exports = devConfig;
