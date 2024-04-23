<script lang="ts" setup>
import config from '@/tailwind.config'
import type { BackgroundStoryblok } from '@/types/storyblok'

interface Props {
  backgrounds?: BackgroundStoryblok[]
}

const { backgrounds = [] } = defineProps<Props>()

interface Emits {
  (event: 'background', payload: string): void
}

const emit = defineEmits<Emits>()

const segment = backgrounds.length === 0 ? 0 : 100 / backgrounds.length
const itemRefs = ref<HTMLDivElement[]>([])
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting
        && entry.target instanceof HTMLDivElement
        && entry.target?.dataset?.colour
      ) {
        emit('background', entry.target.dataset.colour)
      }
    })
  }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 })

  itemRefs.value.forEach((item) => {
    observer?.observe(item)
  })
})

onUnmounted(() => {
  observer && observer.disconnect()

  emit('background', '#2D3F2F')
})
</script>

<template>
  <div
    data-component="AppBackground"
    class="relative"
  >
    <slot />

    <div class="absolute inset-0 flex flex-col items-start justify-start pointer-events-none">
      <div
        v-for="background in backgrounds"
        ref="itemRefs"
        :key="background._uid"
        :style="{ height: `${segment}%` }"
        :data-colour="background?.colour?.color || null"
        class="w-full"
      />
    </div>
  </div>
</template>
