<script lang="ts" setup>
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
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting
          && entry.target instanceof HTMLDivElement
          && entry.target?.dataset?.color
        ) {
          emit('background', entry.target.dataset.color)
        }
      })
    },
    { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
  )

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
  <div class="relative">
    <slot />

    <div class="absolute inset-0 flex flex-col items-start justify-start pointer-events-none">
      <div
        v-for="background in backgrounds"
        ref="itemRefs"
        :key="background._uid"
        class="w-full"
        :style="{ height: `${segment}%` }"
        :data-color="background?.colour?.color || null"
      />
    </div>
  </div>
</template>
