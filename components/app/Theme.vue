<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import type { ThemeStoryblok } from '@/types/storyblok'
import { colours } from '@/tailwind.config'
import { wait } from '@/utilities/helpers'

interface Props {
  themes?: ThemeStoryblok[]
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

onMounted(async () => {
  if (!isStoryPage.value && !themes.length) {
    setAppTheme({
      background: colours.greenHex,
      text: colours.whiteHex,
    })
  }

  await wait(500)

  document.documentElement.style.setProperty('--app-background-speed', '3000ms')
  document.documentElement.style.setProperty('--app-element-speed', '200ms')
  document.documentElement.style.setProperty('--app-header-speed', '200ms')
})

onUnmounted(() => {
  document.documentElement.style.setProperty('--app-background-speed', '500ms')
  document.documentElement.style.setProperty('--app-element-speed', '500ms')
  document.documentElement.style.setProperty('--app-header-speed', '0ms')
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
