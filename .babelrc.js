/*
 * @Author: Huangjs
 * @Date: 2023-08-10 15:01:13
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-08-16 16:48:31
 * @Description: ******
 */

const { MOD_ENV, BABEL_ENV } = process.env;

module.exports = {
  targets:
    MOD_ENV === 'esm'
      ? { esmodules: true } // 目标浏览器是可以使用 ES Modules
      : {
          browsers: ['last 2 versions', 'IE 10'],
        },
  presets: [
    [
      '@babel/preset-env',
      {
        // false的时候按照es6模块输出（保留import/export），可设置commonjs就会按照commonjs模块输出
        modules: MOD_ENV === 'esm' || BABEL_ENV !== 'babel' ? false : 'auto',
        // 尝试将已损坏的语法编译为目标浏览器支持的最接近的未损坏的现代语法
        bugfixes: true, // This option merges the features of @babel/preset-modules
        loose: true, // 松散模式
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins:
    MOD_ENV !== 'esm'
      ? [
          [
            '@babel/plugin-transform-runtime',
            {
              corejs: {
                version: 3,
                proposals: true,
              },
            },
          ],
        ]
      : [],
};
