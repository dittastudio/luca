<script lang="ts" setup>
import type { Theme } from '@@/.storyblok/types/285210/storyblok-components'
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  themes?: Theme[]
}

const { themes = [] } = defineProps<Props>()

const route = useRoute()
const segment = themes.length === 0 ? 0 : 100 / themes.length
const itemRefs = ref<HTMLDivElement[]>([])
const isStoryPage = computed(() => route.path.startsWith('/stories/') && route.path.length > 9) // Hack!

const setAppTheme = (theme: Luca.Theme) => {
  document.documentElement.style.setProperty('--app-background-color', `var(--color-${theme.background})`)
  document.documentElement.style.setProperty('--app-text-color', `var(--color-${theme.text})`)
}

const setSpeeds = (background: string, element: string, header: string) => {
  document.documentElement.style.setProperty('--app-background-speed', background)
  document.documentElement.style.setProperty('--app-element-speed', element)
  document.documentElement.style.setProperty('--app-header-speed', header)
}

onMounted(() => {
  if (!isStoryPage.value && !themes.length) {
    setAppTheme({
      background: 'green',
      text: 'white',
    })
  }
})

onUnmounted(async () => {
  setSpeeds('500ms', '500ms', '0ms')

  await wait(500)

  setSpeeds('3000ms', '200ms', '200ms')
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
        setAppTheme(theme)
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
