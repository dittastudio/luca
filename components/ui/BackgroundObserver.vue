<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  tag?: string
  bgColorClass?: string
}

const { tag = 'section', bgColorClass = 'bg-white' } = defineProps<Props>()

const section = ref(null)
const html = ref(document?.documentElement)

useIntersectionObserver(
  section,
  ([{ isIntersecting }]) => {
    html.value.classList[isIntersecting ? 'add' : 'remove'](bgColorClass)
  },
  { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
)
</script>

<template>
  <Component
    :is="tag"
    ref="section"
    class="flex items-center justify-center text-center h-screen"
  >
    <slot />
  </Component>
</template>
