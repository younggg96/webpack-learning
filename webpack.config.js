/* 
webpack的配置文件
运行webpack指令是会加载里面的配置 所有构建工具都是基于nodejs平台运行的
*/
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
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
          "style-loader",
          // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
          "css-loader",
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        // 使用一个用loader:
        // 下载两个 url-loader file-loader
        loader: 'url-loader',
        options: {
          limit: 8 * 1024

        }
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: 'html-loader',
      },
      {
        // 打包其他资源（除了html/js/css以外的资源)
      }
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
      template: './src/index.html'
    })
  ],

  mode: "development",
};
