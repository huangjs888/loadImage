/*
 * @Author: Huangjs
 * @Date: 2023-08-09 11:24:45
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-08-21 14:29:54
 * @Description: ******
 */

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import pkg from './package.json';

const { NODE_ENV, MOD_ENV } = process.env;

const pathname = MOD_ENV === 'cjs' ? 'lib' : MOD_ENV === 'esm' ? 'es' : 'dist';
const extensions = ['.js', '.ts'];
const config = {
  input: 'src/index.ts',
  output: [
    {
      file: `${pathname}/loadImage${NODE_ENV === 'production' ? '.min' : ''}.js`,
      format: MOD_ENV,
      // umd时挂在全局变量下的模块名称
      name: MOD_ENV === 'umd' ? 'LoadImage' : undefined,
      sourcemap: true,
    },
  ],
  // nodeResolve是将node_modules里的依赖打包进来，这里可以选择一些依赖包，不打包进来，源码中只会保留导入语句
  // 一般明确知道，源码被别人使用后，一定会安装这些依赖，此时这里可以排除（）
  external: Object.keys(pkg.peerDependencies || {}),
  plugins: [
    // 需要打包的源码中如果有导入node_modules的依赖，则配置此项，可以将这些依赖随源码一起打包进来
    nodeResolve({
      mainFields: ['module', 'main'], // 依赖包的入口文件在依赖包的package.json中哪个字段指定
      extensions, // 可以打包的文件后缀
    }),
    // 导入的包如果是commonjs模块，这里会转成es6模块（一般都是node_modules里的安装包）
    commonjs({
      include: '**/node_modules/**',
      extensions,
    }),
    // rollup只负责代码合并，以及设置模块方式，不负责编译代码，如果有新语法等需要编译，还要babel
    // 这里排除了node_modules里的文件，默认认为导入的文件都是编译好的，（浏览器）能够使用的，否则需要放开
    // babelHelpers=runtime表示babel配置文件里要使用@babel/plugin-transform-runtime
    babel({
      babelHelpers: MOD_ENV === 'esm' ? 'bundled' : 'runtime',
      include: 'src/**/*',
      exclude: '**/node_modules/**',
      extensions,
    }),
  ],
};
if (NODE_ENV === 'production') {
  // 生产模式对最后的打包文件进行压缩
  config.plugins.push(
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      },
    }),
  );
}

export default config;
