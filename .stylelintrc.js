module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order', 'stylelint-less'],
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less'
    },
    {
      files: ['*.html', '**/*.{html,vue}'],
      customSyntax: 'postcss-html'
    }
  ],
  rules: {
    'selector-class-pattern': '^([a-z][a-z0-9]*)(-+[a-z0-9]+)*$',
    'declaration-block-trailing-semicolon': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep']
      }
    ]
  }
}
