module.exports =
{
    presets:
    [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "entry", // 引入ie8以上浏览器所有不支持api的polyfill
                corejs: "3" // 声明使用的 core-js 版本
            }
        ],
        "@babel/preset-typescript"
    ],
    plugins:
    [
        "@babel/plugin-syntax-dynamic-import"
    ]
};
