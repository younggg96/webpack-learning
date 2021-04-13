/* 
  webpack的配置文件
  运行webpack指令是会加载里面的配置 所有构建工具都是基于nodejs平台运行的

  webpack 会将打包结果输出
  npx webpack-dev-server 只会在内存中编译打包，没有输出
*/
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")

// process.env.NODE_ENV = 'production';

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      // loader
      {
        // 处理那些文件
        test: /\.css$/,
        // 多个loader处理用use
        use: [
          // 创建style标签，将js中的样式资源插入，添加到head中生效
          // "style-loader",
          // 这个loader 取代 style-loader 提取js中的css成为单独文件
          MiniCssExtractPlugin.loader,
          // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
          "css-loader",
          /*
            css兼容性处理： postcss --> postcss-loader postcss-preset-env
            帮postcss 找到package.json 里面的配置，通过配置加载指定的css兼容性样式
            "browserlists": {
              // 开发环境 设置node环境变量： process.env.NODE_ENV = 'development'
              "development": [
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safer version"
              ],
              // 生产环境 默认是看生产环境
              "production": [
                ">0.2%",
                "not dead",
                "not op_mini all"
              ]
            }
          */
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [
                  require("postcss-preset-env")()
                ]
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(jpg|png|gif)$/,
        // 使用一个用loader:
        // 下载两个 url-loader file-loader
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          name: "[hash:10].[ext]",
          // 关闭es6模块化
          exModules: false,
          publicPath: "imgs",
        },
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: "html-loader",
      },
      {
        // 打包其他资源（除了html/js/css以外的资源)
        exclude: /\.(html|js|css|less|jpg|png|gif)/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          publicPath: "media",
        },
      },
    ],
  },
  plugins: [
    // plugins
    // html-webpack-plugin
    /* 
      默认会创建一个空的HTML， 自动引入打包输出的所有资源（JS/CSS）
      需求： 需要有结构的HTML文件
    */
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件,并自动引入打包输出所有的资源
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: "css/built.css",
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],

  mode: "development",
  // 开发服务器 devServer 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  // 特点： 指挥在内存中编译打包，不会有任何输出
  // 启动devServer指令为： npx webpack-dev-server
  // 安装 npm i webpack-dev-server -D
  devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, "build"),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
  },
};
