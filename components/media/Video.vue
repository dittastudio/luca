<script lang="ts" setup>
import type { AssetStoryblok } from '@/types/storyblok'

interface Props {
  asset?: AssetStoryblok
}

const { asset } = defineProps<Props>()

interface Emits {
  (event: 'seen' | 'playing', payload: boolean): void
}

const emit = defineEmits<Emits>()

const video = ref<HTMLVideoElement | null>(null)
const seen = ref(false)
const src = computed(() => seen.value ? asset?.filename : '')

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!(entry.target instanceof HTMLVideoElement)) return

        if (entry.isIntersecting && !seen.value) {
          emit('seen', true)
          seen.value = true
        }

        if (seen.value && src.value) {
          if (entry.isIntersecting && entry.target.paused) {
            entry.target.play()
          }
          else if (!entry.isIntersecting && !entry.target.paused) {
            entry.target.pause()
          }
        }
      })
    },
    { rootMargin: '0px 0px 0px 0px', threshold: 0 },
  )

  video.value && observer?.observe(video.value)
  video.value?.addEventListener('playing', () => emit('playing', true))
  video.value?.addEventListener('pause', () => emit('playing', false))
})

onUnmounted(() => {
  observer && observer.disconnect()

  video.value?.removeEventListener('playing', () => emit('playing', true))
  video.value?.removeEventListener('pause', () => emit('playing', false))
})
</script>

<template>
  <video
    v-if="asset"
    ref="video"
    :src="src"
    autoplay
    muted
    loop
  />
</template>
