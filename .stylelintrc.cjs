module.exports = {
  // 引入标准配置文件和scss配置扩展
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-scss'],
  rules: {
    // url值必须使用单引号包裹
    'function-url-quotes': ['always'],
    // 变量后必须添加!default，本地局部变量可以不加
    'scss/dollar-variable-default': [true, { ignore: 'local' }],
    // 属性单独成行
    'declaration-block-single-line-max-declarations': [1],
    'property-no-vendor-prefix': [true],
    'value-no-vendor-prefix': [true],
    // 不要使用@while
    'at-rule-disallowed-list': ['while'],
    // 不能使用颜色名定义颜色，只能使用HEX、rgab或hsl格式
    'color-named': ['never'],
    // 不能有无效的16进制颜色值
    'color-no-invalid-hex': [true],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'layer', 'apply', 'variants', 'responsive', 'screen'],
      },
    ],
  },
  ignoreFiles: ['node_modules', 'src/**/*.tsx', 'src/**/*.ts', 'src/**/*.jsx', 'src/**/*.js'],
};
