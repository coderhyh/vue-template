import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    ignores: ['**/node_modules/**', '**/dist/**', './src/*.d.ts'],
    unocss: true,
    vue: true,
  },
  {
    rules: {
      'no-console': 'off',
      'eqeqeq': 'off',
      'no-sequences': 'off',
      'perfectionist/sort-objects': 'off',
      'unused-imports/no-unused-vars': 'off',
      'antfu/top-level-function': 'off',
      'vue/html-self-closing': 'off',
      'vue/attributes-order': 'error',
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
    },
  },
)
