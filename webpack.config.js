/*
 * @Author: Huangjs
 * @Date: 2021-10-21 16:11:29
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-07-27 09:53:43
 * @Description: ******
 */

const webpack = require('webpack');
const resolve = require('path').resolve;

module.exports = {
  devtool: 'source-map',
  entry: {
    loadImage: resolve(__dirname, 'src/index.ts'),
  },
  output: {
    filename: '[name].min.js',
    library: {
      name: 'LoadImage', // window内或exports内存储的变量名称
      type: 'umd', // 使用通用模块定义（包含了AMD，CommonJs以及window内置）
    },
    path: resolve(__dirname, 'dist/'),
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader', // 使用babel转换源代码到配置后的语法
            options: {
              // 覆盖babel.config.json配置
              presets: [
                [
                  '@babel/preset-env', // 根据目标环境转换语法（es6以上=>es5）
                  {
                    targets: 'ie 10', // 输出目标按照IE10（ie10基本需要es5及以下的语法）
                  },
                ],
                '@babel/preset-typescript', // ts文件使用babel转换了，所以无需使用ts-loader了
              ],
              plugins: [
                [
                  '@babel/plugin-transform-runtime', // 在运行时提供es6以上的内置对象及方法的垫片
                  {
                    corejs: {
                      version: 3, // 运行时使用corejs@3最大程度加入垫片
                      proposals: true, // 包含提案的语法
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: ['web', 'es5'], // webpack构建时候添加的代码片段按照web平台的es5输出
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
};
