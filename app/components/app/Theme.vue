<script lang="ts" setup>
import type { Theme } from '@@/.storyblok/types/285210/storyblok-components'
import { colours } from '@@/tailwind.config'
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
  document.documentElement.style.setProperty('--app-background-color', theme.background)
  document.documentElement.style.setProperty('--app-text-color', theme.text)
}

const setSpeeds = (background: string, element: string, header: string) => {
  document.documentElement.style.setProperty('--app-background-speed', background)
  document.documentElement.style.setProperty('--app-element-speed', element)
  document.documentElement.style.setProperty('--app-header-speed', header)
}

onMounted(() => {
  if (!isStoryPage.value && !themes.length) {
    setAppTheme({
      background: colours.greenHex,
      text: colours.whiteHex,
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
        const background = colours[`${theme.background}Hex` as keyof typeof colours] || colours.greenHex
        const text = colours[`${theme.text}Hex` as keyof typeof colours] || colours.whiteHex

        setAppTheme({ background, text })
      }
    })
  },
  { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
)
</script>

<template>
  <div class="app-theme">
    <slot />

    <div class="app-theme__segment">
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

<style lang="postcss" scoped>
.app-theme {
  position: relative;
}

.app-theme__segment {
  pointer-events: none;

  position: absolute;
  inset: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>
