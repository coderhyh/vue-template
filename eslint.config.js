import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    ignores: ['**/node_modules/**', '**/dist/**'],
    unocss: true,
    vue: true,
  },
  {
    rules: {
      'no-console': 'off',
      'no-sequences': 'off',
      'perfectionist/sort-objects': 'error',
      'unused-imports/no-unused-vars': 'off',
      'vue/attributes-order': 'error',
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
    },
  },
)
