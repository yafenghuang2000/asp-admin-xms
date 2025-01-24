module.exports = {
  extends: [
    // 'stylelint-config-standard',
    // 'stylelint-config-recommended-scss',
    // 'stylelint-prettier/recommended',
    'stylelint-config-standard', // 添加标准配置
    'stylelint-prettier/recommended', // 如果使用 prettier
  ],
  rules: {
    // // 自定义规则，例如禁止使用内联样式
    // 'declaration-no-important': true,
    // // 强制属性名和值之间有一个空格
    // 'declaration-colon-space-after': 'always',
    // // 其他自定义规则可以在这里添加
    // indentation: 2,
    // 'string-quotes': 'single',
    // 'color-hex-case': 'lower',
    // 'block-no-empty': true,
    // 'declaration-colon-space-after': 'always', // 确保这些规则是有效的
    // indentation: 2,
    // 'string-quotes': 'single',
    // 'color-hex-case': 'lower', // 确保这些规则是有效的
  },
};
