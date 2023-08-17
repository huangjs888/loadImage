/*
 * @Author: Huangjs
 * @Date: 2021-10-21 15:05:51
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-08-16 17:02:08
 * @Description: ******
 */

module.exports = {
  env: {
    browser: true, // 涵盖浏览器全局变量
    es6: true, // 涵盖es6全局变量
    node: true, // 涵盖node全局变量
    jest: true, // 涵盖测试插件jest全局变量
  },
  globals: {
    // JSX: true,// 自定义全局变量，如 jQuery: true,
  },
  // 如果是js项目使用 '@babel/eslint-parser'
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: [
    'prettier',
    '@typescript-eslint', // 如果是js项目去掉这个
  ],
  settings: {
    // support import modules from TypeScript files in JavaScript files
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.d.ts'],
      },
    },
  },
  rules: {
    // Typescript Plugin
    // The following rules are made available via `@typescript-eslint/eslint-plugin`
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 1,
    'no-undef': 'off',
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': 1,
    '@typescript-eslint/no-redeclare': ['error'],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
  },
};
