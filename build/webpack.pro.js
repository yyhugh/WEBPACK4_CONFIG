const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const dotenv = require("dotenv");

const { build: { bundleAnalyzer, uploadCDN } } = require("./config");

const { resolve } = require("./utils");

// 读取环境变量
dotenv.config({
    path: resolve(".env") // 文件路径
});

// 生产环境配置
const proConfig =
{
    plugins:
    [
        new ProgressBarPlugin() // 编译进度条
    ],
    output:
    {
        publicPath: "/"
    },
    // 打印信息控制
    stats:
    {
        modules: false,
        children: false,
        entrypoints: false,
        warnings: false
    },
    optimization:
    {
        minimizer:
        [
            // 压缩js文件
            new TerserPlugin({
                extractComments: false // 提取注释
            }),
            new OptimizeCSSAssetsPlugin() // 压缩css文件
        ]
    }
};

// 打包结果可视化分析
if (bundleAnalyzer)
{
    const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
    proConfig.plugins.push(new BundleAnalyzerPlugin());
}

// 输出结果打包上传阿里云OSS（需和`.env`环境变量文件一同使用）
if (uploadCDN)
{
    const WebpackAliyunOssPlugin = require("webpack-aliyun-oss-plugin");

    // 设置静态资源引入路径。格式：托管的服务器域名/项目名
    proConfig.output.publicPath = path.join(`${process.env.OSS_DOMAIN || ""}/${process.env.npm_package_name}/`);

    // 输出结果打包上传阿里云OSS
    proConfig.plugins.push(new WebpackAliyunOssPlugin({
        ak: process.env.OSS_AK,           // 阿里云授权accessKeyId，必填项，可以由配置文件方式设置
        sk: process.env.OSS_SK,           // 阿里云授权accessKeySecret，必填项，可以由配置文件方式设置
        bucket: process.env.OSS_BUCKET,   // 需要上传到的bucket的名称
        region: process.env.OSS_REGION,   // bucket所在的区域，如果是在阿里云机器上，可以使用内部region，节省流量
        filter: asset => !/\.html|config\.js$/.test(asset) // 文件过滤器，通过该方法可自由决定哪些文件需要上传
    }));
}

module.exports = proConfig;
