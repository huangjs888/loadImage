/*
 * @Author: Huangjs
 * @Date: 2021-10-21 15:05:51
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-02-20 10:55:25
 * @Description: ******
 */

module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
    amd: true,
  },

  parserOptions: { ecmaVersion: 6, sourceType: 'module' },

  extends: ['plugin:prettier/recommended'],

  plugins: ['eslint-comments'],

  overrides: [
    {
      files: ['*.js'],
      parser: '@babel/eslint-parser',
    },
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint/eslint-plugin'],
      rules: {
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
      },
    },
  ],

  globals: {
    __DEV__: true,
    __dirname: false,
    clearTimeout: true,
    console: false,
    document: true,
    Event: false,
    Promise: true,
    setTimeout: true,
    window: true,
  },

  rules: {
    // 一般配置
    'comma-dangle': [1, 'always-multiline'], // 允许或不允许使用尾部逗号
    'no-cond-assign': 1, // 不允许条件表达式中的赋值
    'no-console': 0, // 不允许使用控制台（在节点环境中默认为关闭）。
    'no-const-assign': 2, // 不允许对const-declared变量进行赋值。
    'no-constant-condition': 0, // 不允许在条件中使用常量表达式
    'no-control-regex': 1, // 不允许在正则表达式中使用控制字符
    'no-debugger': 1, // 不允许使用调试器
    'no-dupe-class-members': 2, // 不允许在类成员中出现重复的名字
    'no-dupe-keys': 2, // 创建对象字面时不允许有重复的按键
    'no-empty': 0, // 不允许空语句
    'no-ex-assign': 1, // 不允许在捕获块中对异常进行赋值
    'no-extra-boolean-cast': 1, // 不允许在布尔上下文中进行双重否定的布尔转换。
    'no-extra-parens': 0, // 不允许使用不必要的括号（默认为关闭）。
    'no-extra-semi': 1, // 不允许使用不必要的分号
    'no-func-assign': 1, // 不允许覆盖写成函数声明的函数
    'no-inner-declarations': 0, // 不允许在嵌套块中进行函数或变量声明
    'no-invalid-regexp': 1, // 不允许在正则表达式构造器中出现无效的正则表达式字符串
    'no-negated-in-lhs': 1, // 不允许否定表达式中的左边操作数
    'no-obj-calls': 1, // 不允许将全局对象（Math 和 JSON）的对象属性作为函数使用。
    'no-regex-spaces': 1, // 不允许在正则表达式字面中出现多个空格
    'no-reserved-keys': 0, // 不允许保留字被用作对象字面的键（默认为关闭）。
    'no-sparse-arrays': 1, // 不允许使用稀疏数组
    'no-unreachable': 2, // 不允许在返回、抛出、继续或中断语句后出现不可到达的语句。
    'use-isnan': 1, // 不允许用NaN值进行比较
    'valid-jsdoc': 0, // 确保JSDoc注释是有效的（默认为关闭）
    'valid-typeof': 1, // 确保typeof的结果与有效的字符串进行比较。
    // 最佳实践：这些规则是为了防止你犯错误，它们或者规定了一个更好的方法来做某事，或者帮助你避免犯错误。
    'block-scoped-var': 0, // 将var语句视为块作用域（默认为关闭）。
    complexity: 0, //指定程序中允许的最大循环复杂性（默认为关闭）。
    'consistent-return': 0, // 要求返回语句总是或从不指定数值
    curly: 1, // 指定所有控制语句的大括号约定。
    'default-case': 0, // 要求在switch语句中使用默认大小写（默认为关闭）
    'dot-notation': 1, // 鼓励尽可能地使用点符号。
    eqeqeq: [1, 'allow-null'], // 要求使用===和!==。
    'guard-for-in': 0, // 确保for-in循环有一个if语句（默认为关闭）。
    'no-alert': 1, // 不允许使用警报、确认和提示。
    'no-caller': 1, // 不允许使用arguments.caller或arguments.callee
    'no-div-regex': 1, // 不允许在正则表达式的开头明确使用除法运算符（默认为关闭）。
    'no-else-return': 0, // 不允许在if中的return之后使用else（默认为关闭）。
    'no-eq-null': 0, // 不允许在没有类型检查运算符的情况下对null进行比较（默认关闭）。
    'no-eval': 2, // 不允许使用eval()。
    'no-extend-native': 1, // 不允许添加到本地类型。
    'no-extra-bind': 1, // 不允许使用不必要的函数绑定
    'no-fallthrough': 1, // 不允许case语句的突破
    'no-floating-decimal': 1, // 不允许在数字字面中使用前导或尾部小数点（默认为关闭）。
    'no-implied-eval': 1, // 不允许使用类似eval()的方法。
    'no-labels': 1, // 不允许使用带标签的语句
    'no-iterator': 1, // 不允许使用 __iterator__ 属性。
    'no-loop-func': 0, // 不允许在循环中创建函数
    'no-multi-str': 0, // 不允许使用多行字符串
    'no-native-reassign': 0, // 不允许对本地对象进行重新赋值
    'no-new': 1, // 当不是赋值或比较的一部分时，不允许使用new操作符
    'no-new-func': 2, // 不允许对Function对象使用new操作。
    'no-new-wrappers': 1, // 不允许创建字符串、数字和布尔的新实例。
    'no-octal': 1, // 不允许使用八进制字。
    'no-octal-escape': 1, // 不允许在字符串字面中使用八进制转义序列，例如var foo = "Copyright\251";
    'no-proto': 1, // 不允许使用 __proto__ 属性。
    'no-redeclare': 0, // 不允许对同一个变量进行多次声明
    'no-return-assign': 1, // 不允许在返回语句中使用赋值。
    'no-script-url': 1, // 不允许使用javascript: urls.
    'no-self-compare': 1, // 不允许使用两边完全相同的比较（默认为关闭）。
    'no-sequences': 1, // 不允许使用逗号运算符
    'no-unused-expressions': 0, // 不允许在语句位置使用表达式
    'no-useless-escape': 1, // 不允许在字面上使用没有任何效果的转义。
    'no-void': 1, // 不允许使用void运算符（默认为关闭）。
    'no-warning-comments': 0, // 不允许在注释中使用可配置的警告词"。1, //例如TODO或FIXME（默认关闭）。
    'no-with': 1, // 不允许使用with语句。
    radix: 1, // 要求使用parseInt()的第二个参数（默认关闭）。
    'semi-spacing': 1, // 要求在分号后加一个空格。
    'vars-on-top': 0, // 要求在其包含的范围之上声明所有的变量（默认为关闭）
    'wrap-iife': 0, // 要求立即将函数调用包裹在括号中（默认为关闭）。
    yoda: 1, // 要求或不允许Yoda条件。
    // 变量，这些规则与变量声明有关。
    'no-catch-shadow': 1, // 不允许 catch 子句的参数名与外部范围的变量相同（在节点环境中默认为关闭）。
    'no-delete-var': 1, // 不允许删除变量。
    'no-label-var': 1, // 不允许标签与变量共用一个名字
    'no-shadow': 1, // 不允许声明已经在外层作用域中声明的变量
    'no-shadow-restricted-names': 1, // 不允许对参数等名称进行阴影处理
    'no-undef': 2, // 不允许使用未声明的变量，除非在/*global */块中提到。
    'no-undefined': 0, // 不允许使用未定义的变量（默认为关闭）。
    'no-undef-init': 1, // 在初始化变量时不允许使用未定义变量。
    'no-unused-vars': [
      1,
      { vars: 'all', args: 'none', ignoreRestSiblings: true },
    ], // 不允许声明代码中不使用的变量
    'no-use-before-define': 0, // 不允许在定义变量之前使用这些变量
    // Node.js：这些规则是针对在Node.js上运行的JavaScript的。
    'handle-callback-err': 1, // 强制执行回调中的错误处理（默认为关闭）（在node环境中默认为打开）。
    'no-mixed-requires': 1, // 不允许混合常规变量和require声明 (默认为关闭) (在node环境中默认为打开)
    'no-new-require': 1, // 不允许在require函数中使用new操作符 (默认为关闭) (在node环境中默认为打开)
    'no-path-concat': 1, // 不允许使用 __dirname 和 __filename 的字符串连接 (默认为关闭) (在节点环境中默认为打开)
    'no-process-exit': 0, // 不允许使用 process.exit() (在节点环境中默认为打开)
    'no-restricted-modules': 1, // 限制使用指定的节点模块 (默认为关闭)
    'no-sync': 0, // 不允许使用同步方法 (默认关闭)
    // ESLint注释插件：以下规则通过`eslint-plugin-eslint-comments`来实现
    'eslint-comments/no-aggregating-enable': 1, // 不允许为多个eslint-disable注释提供eslint-enable注释。
    'eslint-comments/no-unlimited-disable': 1, // 不允许没有规则名称的eslint-disable注释。
    'eslint-comments/no-unused-disable': 1, // 不允许不包括任何错误的禁用。
    'eslint-comments/no-unused-enable': 1, // 不允许启用任何东西或启用没有被禁用的规则。
    // 风格问题：这些规则纯粹是风格问题，而且是相当主观的。
    'key-spacing': 0,
    'keyword-spacing': 1, // 强制执行关键词前后的间距
    'jsx-quotes': [1, 'prefer-double'], // 对所有不包含双引号的JSX属性值强制使用双引号。
    'comma-spacing': 0,
    'no-multi-spaces': 0,
    'brace-style': 0, // 强制执行一种真正的大括号样式（默认为关闭）。
    camelcase: 0, // 要求使用骆驼字母的名字
    'consistent-this': 1, // 捕获当前执行环境时执行一致的命名（默认为关闭）。
    'eol-last': 1, // 强制执行文件末尾的换行，不能有多个空行
    'func-names': 0, // 要求函数表达式有一个名字（默认为关闭）。
    'func-style': 0, // 强制使用函数声明或表达式（默认关闭）。
    'new-cap': 0, // 要求构造函数使用大写字母
    'new-parens': 1, // 在调用没有参数的构造函数时，不允许省略括号。
    'no-nested-ternary': 0, // 不允许嵌套三元表达式（默认为关闭）。
    'no-array-constructor': 1, // 不允许使用数组构造函数
    'no-empty-character-class': 1, // 不允许在正则表达式中使用空字符类
    'no-lonely-if': 0, // 不允许将if作为else块中的唯一语句（默认为关闭）。
    'no-new-object': 1, // 不允许使用Object构造函数。
    'func-call-spacing': 1, // 不允许在函数标识符和应用之间留有空格。
    'no-ternary': 0, // 不允许使用三元运算符（默认为关闭）。
    'no-trailing-spaces': 1, // 不允许在行末使用尾部的白字。
    'no-underscore-dangle': 0, // 不允许标识符中出现悬空的下划线
    'no-mixed-spaces-and-tabs': 1, // 不允许在缩进时使用混合空格和制表符
    quotes: [1, 'single', 'avoid-escape'], //指定是否应该使用双引号或单引号
    'quote-props': 0, // 要求在对象字面属性名称周围使用引号（默认为关闭）。
    semi: 1, // 要求或不允许使用分号而不是ASI
    'sort-vars': 0, // 对同一声明块中的变量进行排序（默认为关闭）。
    'space-in-brackets': 0, // 要求或不允许括号内有空格（默认为关闭）。
    'space-in-parens': 0, // 要求或不允许小括号内有空格 (默认为关闭)
    'space-infix-ops': 1, // 要求运算符周围有空格
    'space-unary-ops': [1, { words: true, nonwords: false }], // 要求或不允许在单数运算符之前/之后有空格（默认为有字，默认为无字）。
    'max-nested-callbacks': 0, // 指定回调可以嵌套的最大深度（默认为关闭）。
    'one-var': 0, // 每个函数只允许一个var语句 (默认关闭)
    'wrap-regex': 0, // 要求用圆括号包裹重词字样（默认为关闭）
    // 遗留问题：以下规则是为了与JSHint和JSLint兼容而包含的。虽然这些规则的名称可能与JSHint/JSLint的对应规则不一致，但功能是一样的。
    'max-depth': 0, //指定块可以嵌套的最大深度（默认为关闭）。
    'max-len': 0, // 指定程序中一行的最大长度（默认为关闭）。
    'max-params': 0, //限制在函数声明中可以使用的参数数量。(默认为关闭)
    'max-statements': 0, // 指定一个函数中允许的最大语句数（默认为关闭）
    'no-bitwise': 1, // 不允许使用位运算符（默认为关闭）。
    'no-plusplus': 0, // 不允许使用单数运算符, ++ 或 -- (默认为关闭)
  },
};
