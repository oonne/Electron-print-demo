const fs = require('fs');
const path = require('path');
//读取prettier配置
const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript', 
    'prettier'
  ],
  plugins: [
    'prettier',
    'react',
    'react-hooks',
    '@typescript-eslint',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'linebreak-style': [0, 'error', 'windows'],
    'import/extensions': 'off',
    //jsx 不允许显示js后缀
    'react/jsx-filename-extension': 'off',
    // 如果属性值为 true, 可以直接省略
    'react/jsx-boolean-value': 1,
    // 对于没有子元素的标签来说总是自己关闭标签
    'react/self-closing-comp': 1,
    // 当在 render() 里使用事件处理方法时，提前在构造函数里把 this 绑定上去
    'react/jsx-no-bind': 0,
    // React中函数的先后顺序
    'react/sort-comp': 'off',
    //  React组件名使用帕斯卡命名, 实例使用骆驼式命名
    'react/jsx-pascal-case': 1,
    // didmount不使用setState
    'react/no-did-mount-set-state': 0,
    // didupdate不使用setState
    'react/no-did-update-set-state': 1,
    // 禁止使用嵌套的三目运算
    'no-nested-ternary': 'off',
    // 解构赋值
    'react/destructuring-assignment': [0, 'always'],
    // 属性验证
    'react/prop-types': 'off',
    // 多余的依赖
    'import/no-extraneous-dependencies': 'off',
    // jsx关闭位置
    'react/jsx-closing-tag-location': 1,
    // 多行
    'react/jsx-wrap-multilines': 'off',
    // 一行一个表达式
    'react/jsx-one-expression-per-line': 'off',
  },
};
