// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  // https://cn.eslint.org/docs/rules/
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 禁用 debugger，仅生产环境启用。
    'vue/no-side-effects-in-computed-properties': 0,  // 不报错vue中的计算属性造成的其他属性变化的边际影响。
    "vue/max-attributes-per-line": [2, {  // vue文件每行最大允许2个属性，
      "singleline": 10,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/html-self-closing": [2, {  // 没有内容的html标签需要变为自闭和标签。
      "html": {
        "void": "never",
        "normal": "always",
        "component": "always"
      },
      "svg": "always",
      "math": "always"
    }],
    "vue/name-property-casing": [0, "PascalCase"], // 不强制vue的组件name名必须使用大驼峰。
    'accessor-pairs': 2,              // 强制 getter 和 setter 在对象中成对出现
    'arrow-spacing': [2, {            // 强制箭头函数的箭头前后使用1个或多个的空格
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'],   // 强制在代码块中开括号前和闭括号后有空格
    'brace-style': [2, '1tbs', {      // 强制在代码块中使用one true brace style大括号风格, 也可以选择其他风格。https://cn.eslint.org/docs/rules/brace-style
      'allowSingleLine': true         // 允许块的开括号和闭括号在 同一行
    }],
    'camelcase': [0, {                // 强制使用骆驼拼写法命名约定
      'properties': 'always'
    }],
    'comma-dangle': [2, 'never'],     // 禁止末尾逗号
    'comma-spacing': [2, {            // 禁止逗号前空格，强制逗号后必须有1个或多个空格。
      'before': false,
      'after': true
    }],
    'comma-style': [2, 'last'],       // 要求逗号放在数组元素、对象属性或变量声明之后，且在同一行
    'constructor-super': 2,           // 要求在构造函数中有 super() 的调用
    'curly': [2, 'multi-line'],       // 允许在单行中省略大括号，单非单行则必须使用大括号。https://cn.eslint.org/docs/rules/curly
    'dot-location': [2, 'property'],  // 表达式中的点号操作符应该和属性在同一行。
    'eol-last': 2,                    // 强制文件末尾保留一行空行
    'eqeqeq': 0,                      // 不强制要求必须使用 === 代替 ==，因为很多人的项目写了 == ，要改篇幅太大。
    'generator-star-spacing': [2, {   // 强制 generator 函数中 * 号前后各一个空格。
      'before': true,
      'after': true
    }],
    'handle-callback-err': [2, '^(err|error)$'],  // 强制回调函数中有处理错误err,或者error
    'indent': [2, 2, {                // 强制缩进，缩进为2个空格。
      'SwitchCase': 1
    }],
    'jsx-quotes': [2, 'prefer-single'], // 强制所有不包含单引号的 JSX 属性值使用单引号。
    'key-spacing': [2, {
      'beforeColon': false,           // 禁止在对象字面量的键和冒号之间存在空格
      'afterColon': true              // 要求在对象字面量的冒号和值之间存在至少有一个空格
    }],
    'keyword-spacing': [2, {          // 强制关键字前后必须有1个或以上的空格。
      'before': true,
      'after': true
    }],
    'new-cap': [2, {
      'newIsCap': true,               // 要求调用 new 操作符时有首字母大小的函数。
      'capIsNew': false               // 允许调用首字母大写的函数时没有 new 操作符。
    }],
    'no-mixed-operators': 0,          // 不禁用操作符混用。
    'new-parens': 2,                  // 强制括号后的新构造函数没有参数
    'no-array-constructor': 2,        // 禁用 Array 构造函数
    'no-caller': 2,                   // 禁用 arguments.caller 或 arguments.callee
    'no-console': 'off',              // 不禁用console
    'no-class-assign': 2,             // 不允许修改类声明的变量
    'no-cond-assign': 2,              // 禁止条件表达式中出现赋值操作符
    'no-const-assign': 2,             // 禁止修改 const 声明的变量
    'no-control-regex': 2,            // 禁止在正则表达式中使用控制字符
    'no-delete-var': 2,               // 禁止删除变量
    'no-dupe-args': 2,                // 禁止 function 定义中出现重名参数
    'no-dupe-class-members': 2,       // 禁止类成员中出现重复的名称
    'no-dupe-keys': 2,                // 禁止对象字面量中出现重复的 key
    'no-duplicate-case': 2,           // 禁止出现重复的 case 标签
    'no-empty-character-class': 2,    // 禁止在正则表达式中使用空字符集
    'no-empty-pattern': 2,            // 禁止使用空解构模式
    'no-eval': 0,                     // 禁止使用eval
    'no-ex-assign': 2,                // 禁止对 catch 子句中的异常重新赋值 
    'no-extend-native': 0,            // 不禁止扩展原生类型 , 还是因为本项目中大量这样操作，其实不规范。
    'no-extra-bind': 2,               // 禁止不必要的 .bind() 调用
    'no-extra-boolean-cast': 2,       // 禁止不必要的布尔转换
    'no-extra-parens': [2, 'functions'],  // 只在 函数表达式周围禁止不必要的圆括号
    'no-fallthrough': 2,              // 禁止 case 语句落空，意指 switch case必须以break，return，throw来结束。
    'no-floating-decimal': 2,         // 禁止数字字面量中使用前导和末尾小数点，如果团队一直这样写.25这样的，那就改为0
    'no-func-assign': 2,              // 禁止对 function 声明的函数变量重新赋值
    'no-implied-eval': 2,             // 消除使用 setTimeout()、setInterval() 或 execScript() 时隐式的 eval()
    'no-inner-declarations': [2, 'functions'],  //  禁止 function 声明出现在嵌套的语句块中
    'no-invalid-regexp': 2,           // 禁止在 RegExp 构造函数中出现无效的正则表达式
    'no-irregular-whitespace': 2,     // 禁止不规则的空白
    'no-iterator': 2,                 // 禁用 __iterator__ 属性
    'no-label-var': 2,                // 不允许标签与变量同名
    'no-labels': [2, {                // 禁用标签，虽然目前看来也没多少人用。
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2,              // 禁用不必要的嵌套块
    'no-mixed-spaces-and-tabs': 2,    // 禁止空格和 tab 的混合缩进  
    'no-multi-spaces': 2,             // 禁止使用多个空格
    'no-multi-str': 2,                // 禁止使用多行字符串
    'no-multiple-empty-lines': [2, {  // 禁止出现多行空行，最大空行1
      'max': 1
    }],
    // 'no-native-reassign': 2,       // 禁止对原生对象或只读的全局对象进行赋值，不建议使用了。
    'no-native-reassign' : 2,         // 禁止对原生对象或只读的全局对象进行赋值
    // 'no-negated-in-lhs': 2,        // 禁止对关系运算符的左操作数使用否定操作符,不建议使用了。
    'no-unsafe-negation': 2,          // 禁止对关系运算符的左操作数使用否定操作符
    'no-new-object': 2,               // 禁用 Object 构造函数，var myObject = new Object();
    'no-new-require': 2,              // 禁止调用 require 时使用 new 操作符
    'no-new-symbol': 2,               // 禁止 Symbolnew 操作符和 new 一起使用	
    'no-new-wrappers': 2,             // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-obj-calls': 2,                // 禁止将 Math、JSON 和 Reflect 对象当作函数进行调用。
    'no-octal': 2,                    // 禁用八进制字面量
    'no-octal-escape': 2,             // 禁止在字符串中使用八进制转义序列
    'no-path-concat': 2,              // 禁止对 __dirname 和 __filename 进行字符串连接
    'no-proto': 2,                    // 禁用 __proto__ 属性
    'no-redeclare': 0,                // 禁止多次声明同一变量
    'no-regex-spaces': 2,             // 禁止正则表达式字面量中出现多个空格
    'no-return-assign': [2, 'except-parens'],  // 禁止在 return 语句中使用赋值语句， 除非使用括号把它们括起来
    'no-self-assign': 2,              // 禁止自我赋值
    'no-self-compare': 2,             // 禁止自身比较
    'no-sequences': 2,                // 禁用逗号操作符
    'no-shadow-restricted-names': 2,  // 禁止将标识符定义为受限的名字
    // 'no-spaced-func': 2,           // 已弃用，由func-call-spacing代替。
    'func-call-spacing': [2, 'never'],// 禁止在函数名和开括号之间有空格
    'no-sparse-arrays': 2,            // 禁用稀疏数组
    'no-this-before-super': 2,        // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-throw-literal': 0,            // 禁止抛出异常字面量,但是项目中有使用较多，所以就不禁用了。
    'no-trailing-spaces': 2,          // 禁用行尾空格
    'no-undef': 2,                    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef-init': 2,               // 禁止将变量初始化为 undefined
    'no-unexpected-multiline': 0,     // 禁止出现令人困惑的多行表达式, 这里关闭。
    'no-unmodified-loop-condition': 2,// 禁用一成不变的循环条件
    'no-unneeded-ternary': [2, {      // 禁止可以在有更简单的可替代的表达式时使用三元操作符
      'defaultAssignment': true       // 允许/禁止条件表达式作为默认的赋值模式 
    }],
    'no-unreachable': 2,              // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'no-unsafe-finally': 2,           // 禁止在 finally 语句块中出现控制流语句
    'no-unused-vars': [2, {           // 禁止出现未使用过的变量.
      'vars': 'all',                  // 检测所有变量，包括全局环境中的变量。这是默认值。
      'args': 'none'                  // 不检查参数。
    }],
    'no-useless-call': 2,             // 禁止不必要的 .call() 和 .apply()
    'no-useless-computed-key': 2,     // 禁止在对象中使用不必要的计算属性
    'no-useless-constructor': 2,      // 禁用不必要的构造函数
    'no-useless-escape': 0,           // 禁用不必要的转义字符
    'no-whitespace-before-property': 2, // 禁止属性前有空白
    'no-with': 2,                     // 禁用 with 语句 
    'one-var': [2, {                  // 强制函数中的变量要么一起声明要么分开声明  // https://cn.eslint.org/docs/rules/one-var
      'initialized': 'never'          // 要求每个作用域的初始化的变量有多个变量声明
    }],
    'operator-linebreak': [2, 'after', { // 强制操作符使用一致的换行符风格, 这里是操作符放在后面。
      'overrides': {                  // 覆盖对指定的操作的全局设置
        '?': 'before',                // ? 换行时会放在前面。
        ':': 'before'                 // : 换行放前面。
      }
    }],
    'padded-blocks': [2, 'never'],    // 禁止块语句和类的开始或末尾有空行
    'quotes': [2, 'single', {         // 要求尽可能地使用单引号
      'avoidEscape': true,            // 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
      'allowTemplateLiterals': true   // 允许字符串使用反勾号
    }],
    'semi': [2, 'never'],             // 禁止在语句末尾使用分号
    'semi-spacing': [2, {             // 强制分号前后有空格
      'before': false,                // 分号前面不要空格，
      'after': true                   // 分号后面必须空格。
    }],
    'space-before-blocks': [2, 'always'],         // 块语句必须总是至少有一个前置空格。
    'space-before-function-paren': [2, 'always'],  // 禁止在函数的()前面有空格
    'space-in-parens': [2, 'never'],              // 强制圆括号内没有空格
    'space-infix-ops': 2,                         // 要求中缀操作符周围有空格
    'space-unary-ops': [2, {                      // 强制在一元操作符前后使用一致的空格
      'words': true,                              // 单词类一元操作符，例如：new、delete、typeof、void、必须空格。
      'nonwords': false                           // -、+、--、++、!、!!这些不用空。
    }],
    'spaced-comment': [2, 'always', {             // 强制在注释中 // 或 /* 必须跟随至少一个空白。
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [2, 'always'],      // 要求模板字符串中的花括号内出现至少一个空格。
    'use-isnan': 2,                               // 要求使用 isNaN() 检查 NaN
    'valid-typeof': 2,                            // 强制 typeof 表达式与有效的字符串进行比较
    'wrap-iife': [2, 'any'],                      // 要求 IIFE 使用括号括起来，但允许其它风格。
    'yield-star-spacing': [2, 'both'],            // 强制在 yield* 表达式中 * 周围使用空格
    'yoda': [2, 'never'],                         // 禁止 “Yoda” 条件出现。
    'prefer-const': 0,                            // 要求使用 const 声明那些声明后不再被修改的变量
    'object-curly-spacing': [2, 'always', {       // 强制要求花括号内有空格 
      objectsInObjects: false                     // 禁止以对象元素开始或结尾的对象的花括号中有空格 
    }],
    'array-bracket-spacing': [2, 'never']         // 禁止在数组括号内出现空格
  }
}
