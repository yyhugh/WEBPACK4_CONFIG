const { resolve } = require("./utils");

/**
 * 使用者配置
 * @member {string} outputDir   输出目录
 * @member {object} alias       路径别名
 * @member {object} dll         预编译模块
 * @member {object} devServer   开发服务
 * @member {object} build       生产环境
 */
const config =
{
    outputDir: resolve("dist"), // 输出目录
    alias:
    {
        // 示例："src": path.resolve(__dirname, "../src")
        "src": resolve("src")
    },
    dll:
    {
        // 示例：lodash: ["lodash"]
        lodash: ["lodash"],
        echarts: ["echarts"]
    },
    devServer:
    {
        // 示例：port: 8081
    },
    build:
    {
        bundleAnalyzer: false,  // 打包结果可视化分析
        uploadCDN: false        // 输出结果打包上传阿里云OSS（需和`.env`环境变量文件一同使用）
    }
};

module.exports = config;
