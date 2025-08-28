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

// Apply initial theme during SSR to prevent flicker
const initialTheme = computed(() => {
  // For any page with themes, use the first theme as the initial theme
  if (themes.length > 0) {
    return themes[0]
  }
  return null
})

// Set initial theme in head to prevent SSR flicker
useHead({
  style: [
    {
      innerHTML: initialTheme.value
        ? `:root {
            --app-background-color: var(--color-${initialTheme.value.background});
            --app-text-color: var(--color-${initialTheme.value.text});
          }`
        : '',
    },
  ],
})

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
  // Apply initial theme immediately on mount if we have one
  if (initialTheme.value) {
    setAppTheme({
      background: initialTheme.value.background || 'green',
      text: initialTheme.value.text || 'white',
    })
  }
  else if (!isStoryPage.value && !themes.length) {
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
        && entry.target.dataset.theme
      ) {
        try {
          const theme = JSON.parse(entry.target.dataset.theme) as Luca.Theme
          if (theme.background && theme.text) {
            setAppTheme(theme)
          }
        }
        catch (error) {
          console.warn('Failed to parse theme data:', error)
        }
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
