## 🚀 Webpack4

### 🌲 目录结构

```
├─ build                                        构建配置目录
│   ├─ config.js                                使用者配置
│   ├─ index.js                                 启动入口
│   ├─ utils.js                                 公共方法
│   ├─ webpack.base.js                          基本配置
│   ├─ webpack.dev.js                           开发环境配置
│   ├─ webpack.dll.js                           预编译配置
│   └─ webpack.pro.js                           生产环境配置
├─ dist                                         输出目录
├─ public                                       公共资源目录
│   ├─ static                                   静态资源目录
│   │   └─ dll                                  dll包存放目录
│   │      ├─ lodash-manifest.json
│   │      └─ lodash.dll.js
│   └─ index.html                               HTML模板文件
├─ src                                          源码目录
│   └─ main.js                                  入口文件
├─ .browserslistrc                              浏览器版本配置文件
├─ .env                                         环境变量存储
├─ .gitignore                                   git忽略提交
├─ babel.config.js                              babel配置文件
├─ package.json                                 包管理文件
├─ postcss.config.js                            css插件系统配置文件
└─ tsconfig.json                                typescript配置文件
```

### 🏃 Scripts

| scripts | 作用       | 备注                                   |
| ------- | ---------- | -------------------------------------- |
| dev     | 开发环境   |
| build   | 生产环境   |
| dll     | 模块预编译 | 依赖安装完成后执行一次，可提升构建速度 |

✨ 推荐包管理工具 [yarn](https://classic.yarnpkg.com/zh-Hans/)

### ✏️ 迭代说明

| 版本  | 特性                                                          |
| ----- | ------------------------------------------------------------- |
| 0.1.0 | 处理JS、HTML、图片、样式、字体、视频、音频                    |
| 0.2.0 | 加入devServer、热模块替换、全局环境变量`NODE_ENV`             |
| 0.3.0 | 提升构建速度、优化输出质量、打包结果分析工具、打包文件上传CDN |
| 0.4.0 | 加入typescript，启用装饰器特性                                |

### 📦 依赖包说明

| 开发依赖                            | 版本     | 作用                                                           |
| ----------------------------------- | -------- | -------------------------------------------------------------- |
| v0.1.0                              |
| webpack                             | 4.43.0   | 模块打包器                                                     |
| webpack-cli                         | 3.3.11   | 用于生产模式的项目构建                                         |
| clean-webpack-plugin                | 3.0.0    | 输出目录文件清空                                               |
| copy-webpack-plugin                 | 5.1.1    | 将静态资源文件复制到指定目录                                   |
| html-webpack-plugin                 | 4.3.0    | 处理html文件                                                   |
| css-loader                          | 3.5.3    | 解析`@import` `url`引入相应文件                                |
| style-loader                        | 1.2.1    | 将css代码以`<style>`标签的形式插入html文件中                   |
| mini-css-extract-plugin             | 0.9.0    | 抽离css代码独立打包输出                                        |
| less                                | 3.11.1   | css预处理器                                                    |
| less-loader                         | 6.1.0    | 解析`.less`文件                                                |
| style-resources-loader              | 1.3.3    | 自动化导入文件，用于颜色、变量、mixin                          |
| postcss-loader                      | 3.0.0    | 处理css文件的插件系统                                          |
| autoprefixer                        | 9.7.6    | css浏览器前缀插件，根据浏览器版本配置动态添加                  |
| url-loader                          | 4.1.0    | 较小的图片转Base64                                             |
| file-loader                         | 6.0.0    | 拷贝并输出文件到指定目录，将输出路径替换到引用位置             |
| babel-loader                        | 8.1.0    | 处理js语法以兼容低版本运行环境                                 |
| @babel/core                         | 7.9.6    | babel核心库                                                    |
| @babel/preset-env                   | 7.9.6    | 根据指定运行环境动态处理js语法                                 |
| @babel/plugin-syntax-dynamic-import | 7.8.3    | `import()`语法处理，可用于动态引入资源，实现按需加载           |
| v0.2.0                              |
| webpack-dev-server                  | 3.11.0   | 开发服务                                                       |
| webpack-merge                       | 4.2.2    | 合并webpack配置                                                |
| cross-env                           | 7.0.2    | 跨平台设置环境变量`process.env.NODE_ENV`                       |
| v0.3.0                              |
| add-asset-html-webpack-plugin       | 3.1.3    | 将 dll 以`<script>`标签的方式注入到生成的 html 中              |
| glob                                | 7.1.6    | 扫描磁盘文件，获取匹配文件列表                                 |
| thread-loader                       | 2.1.3    | 多进程编译                                                     |
| cache-loader                        | 4.1.0    | 将编译结果写入硬盘缓存，二次编译时源文件没有变化则直接读取缓存 |
| progress-bar-webpack-plugin         | 2.1.0    | 构建计时与进度条动画                                           |
| webpack-bundle-analyzer             | 3.7.0    | 打包结果可视化分析                                             |
| optimize-css-assets-webpack-plugin  | 5.0.3    | 压缩css文件                                                    |
| terser-webpack-plugin               | 3.0.1    | 压缩js文件                                                     |
| webpack-aliyun-oss-plugin           | 2.1.0    | 文件上传阿里云OSS                                              |
| dotenv                              | 8.2.0    | 读取`.env.*`文件存储的环境变量，通过`process.env`访问          |
| v0.4.0                              |
| @babel/preset-typescript            | 7.9.0    | 编译`.ts`文件                                                  |
| @types/lodash                       | 4.14.150 | 声明文件                                                       |

| 生产依赖 | 版本    | 作用           |
| -------- | ------- | -------------- |
| v0.1.0   |
| core-js  | 3.6.5   | 提供 polyfill  |
| v0.3.0   |
| lodash   | 4.17.15 | 工具库         |
| echarts  | 4.7.0   | 数据可视化图表 |

### ⚡ 提升构建速度

| 着手方向                       | 作用                                                           |
| ------------------------------ | -------------------------------------------------------------- |
| 优化 Loader 配置               | 通过`include`或`exclude`，缩小文件的搜索范围                   |
| resolve.modules 配置           | 指定存放模块目录的绝对路径，不用一层层去寻找                   |
| 热模块替换                     | 只编译有改动的文件                                             |
| DllPlugin & DllReferencePlugin | 预编译第三方模块                                               |
| 合理生成 Source Map            | 在满足源代码调试的基础上，选择性能较高的版本                   |
| thread-loader                  | 多进程编译                                                     |
| cache-loader                   | 将编译结果写入硬盘缓存，二次编译时源文件没有变化则直接读取缓存 |

### ⭐ 优化输出质量

| 着手方向       | 作用                                                   |
| -------------- | ------------------------------------------------------ |
| tree shaking   | 移除Javascript上下文中未引用的代码，生产环境下默认开启 |
| scope hoisting | 作用域提升可减少包体积和代码执行速度                   |
| url-loader     | 将较小的图片转base64，减少http请求                     |
| 压缩代码       | 减少文件体积                                           |
| CDN加速        | 将输出结果打包上传CDN服务器，优化首屏时间              |

### 🎮 环境说明

| 工具        | 版本   |
| ----------- | ------ |
| yarn        | 1.22.4 |
| node        | 14.2.0 |
| webpack     | 4.43.0 |
| webpack-cli | 3.3.11 |
| typescript  | 3.9.2  |
| live-server | 1.2.1  |

### 🎼 环境变量

| .env（阿里云OSS） | 作用                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| OSS_AK            | 阿里云授权accessKeyId                                                |
| OSS_SK            | 阿里云授权accessKeySecret                                            |
| OSS_DOMAIN        | 阿里云服务器域名                                                     |
| OSS_BUCKET        | 需要上传到的bucket的名称                                             |
| OSS_REGION        | bucket所在的区域，如果是在阿里云机器上，可以使用内部region，节省流量 |

注意：从安全角度考虑，`.env 或 .env.*` 文件不能提交到仓库

### 🙋 Q

- v0.1.0
- [url-loader 输出路径不匹配问题](https://juejin.im/post/5b8d1e926fb9a019b66e4657)
- [file-loader 输出路径为`[object Module]`](https://stackoverflow.com/questions/59070216/webpack-file-loader-outputs-object-module)
- [url-loader 与 file-loader 的作用](https://segmentfault.com/a/1190000018987483)
- [常用文件loader介绍](https://yanyinhong.github.io/2017/07/04/Webpack-file-loader-set-introduction/)
- [@babel/plugin-syntax-dynamic-import 的作用](http://www.houfei321.com/2019/05/09/react-v16%E9%AB%98%E7%BA%A7%E6%8C%87%E5%BC%95%EF%BC%9A%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BD/)
- v0.2.0
- [全局声明环境变量 NODE_ENV](https://www.npmjs.com/package/cross-env)
- [devServer 相关配置](https://www.jianshu.com/p/c2dd1c195462)
- [本地开发浏览器跨域问题处理](https://segmentfault.com/a/1190000016199721)
- [devServer使用代理请求cookie丢失问题](https://juejin.im/post/5b59334a6fb9a04fe44ba9e0)
- v0.3.0
- [DllPlugin 与 DllReferencePlugin 的作用](https://webpack.docschina.org/plugins/dll-plugin/)
- [thread-loader 的作用](https://juejin.im/post/5e53dbbc518825494905c45f#heading-8)
- [tree shaking](https://webpack.docschina.org/guides/tree-shaking/)
- [作用域提升(scope hoisting)](https://webpack.docschina.org/plugins/module-concatenation-plugin/)
- [webpack-aliyun-oss-plugin 上传阿里云OSS插件](https://www.npmjs.com/package/webpack-aliyun-oss-plugin)
- v0.4.0
- [@babel/preset-typescript](https://babeljs.io/docs/en/next/babel-preset-typescript.html)
- [tsconfig 无法写入"*.js"文件，因为它会覆盖输入文件](https://segmentfault.com/q/1010000019980246)
- [tsconfig 常用配置选项说明](https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#%E7%BC%96%E8%AF%91%E9%80%89%E9%A1%B9)
