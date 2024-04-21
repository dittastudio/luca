import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/padding-line-between-tags': ['error', [
        { blankLine: 'always', prev: '*', next: '*' },
      ]],
    },
  },
)
