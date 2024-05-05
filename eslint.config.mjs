// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({}),
  {
    ignores: [
      './types/storyblok.d.ts',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/no-v-html': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/padding-line-between-tags': ['error', [
        { blankLine: 'always', prev: '*', next: '*' },
      ]],
    },
  },
)
