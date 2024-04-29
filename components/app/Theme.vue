<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import type { ThemeStoryblok } from '@/types/storyblok'
import { colours } from '@/tailwind.config'

interface Props {
  themes?: ThemeStoryblok[]
}

const { themes = [] } = defineProps<Props>()

interface Emits {
  (event: 'theme', payload: { background: string, text: string }): void
}

const emit = defineEmits<Emits>()

const route = useRoute()
const segment = themes.length === 0 ? 0 : 100 / themes.length
const itemRefs = ref<HTMLDivElement[]>([])
const isStoryPage = computed(() => route.path.startsWith('/stories/') && route.path.length > 9) // Hack!

onMounted(() => {
  if (isStoryPage.value) return

  if (!themes.length) {
    emit('theme', {
      background: colours.greenHex,
      text: colours.whiteHex,
    })
  }
})

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
        const background = colours[`${theme.background}Hex` as keyof typeof colours] || colours.greenHex
        const text = colours[`${theme.text}Hex` as keyof typeof colours] || colours.whiteHex

        emit('theme', {
          background,
          text,
        })
      }
    })
  },
  { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
)
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
        :data-theme="JSON.stringify({ background: theme?.background || null, text: theme?.text || null })"
      />
    </div>
  </div>
</template>
