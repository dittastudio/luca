<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import type { ThemeStoryblok } from '@/types/storyblok'

interface Props {
  themes?: ThemeStoryblok[]
}

const { themes = [] } = defineProps<Props>()

interface Emits {
  (event: 'theme', payload: { background: string, text: string }): void
}

const emit = defineEmits<Emits>()

const segment = themes.length === 0 ? 0 : 100 / themes.length
const itemRefs = ref<HTMLDivElement[]>([])

useIntersectionObserver(
  itemRefs,
  (entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting
        && entry.target instanceof HTMLDivElement
        && entry.target?.dataset?.theme
      ) {
        const theme = JSON.parse(entry.target.dataset.theme) as Luca.Theme

        emit('theme', {
          background: theme.background,
          text: theme.text,
        })
      }
    })
  },
  { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
)

onUnmounted(() => {
  // emit('background', '#2D3F2F')
})
</script>

<template>
  <div class="relative">
    <slot />

    <div class="absolute inset-0 flex flex-col items-start justify-start pointer-events-none">
      <div
        v-for="theme in themes"
        ref="itemRefs"
        :key="theme._uid"
        class="w-full"
        :style="{ height: `${segment}%` }"
        :data-theme="JSON.stringify({ background: theme?.background?.color || null, text: theme?.text?.color || null })"
      />
    </div>
  </div>
</template>
