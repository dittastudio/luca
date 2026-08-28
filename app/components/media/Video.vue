<script lang="ts" setup>
import type { StoryblokAsset } from '#storyblok-types'
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  asset: StoryblokAsset
  ratio?: Luca.TAspectRatios | string | number
  muted?: boolean
  active?: boolean
}

const { asset, ratio = 'auto', muted = true, active = true } = defineProps<Props>()

interface Emits {
  (event: 'seen' | 'playing', payload: boolean): void
}

const emit = defineEmits<Emits>()

const video = ref<HTMLVideoElement | null>(null)
const seen = ref(false)
const src = computed(() => seen.value ? asset?.filename ?? '' : '')
const isMuted = computed(() => muted || !active || !seen.value)

useIntersectionObserver(
  video,
  ([target]) => {
    if (!target) {
      return
    }

    if (target.isIntersecting && !seen.value) {
      emit('seen', true)
      seen.value = true
    }
    else if (target instanceof HTMLVideoElement && target.isIntersecting && seen.value && active && src.value && target.paused) {
      target.play()
    }
    else if (target instanceof HTMLVideoElement && (!target.isIntersecting || !active) && seen.value && src.value && !target.paused) {
      target.pause()
    }
  },
  { rootMargin: '50% 0px 50% 0px', threshold: 0 },
)

watch(() => active, (isActive) => {
  if (!video.value || !src.value) {
    return
  }

  if (isActive) {
    video.value.play()
  }
  else {
    video.value.pause()
  }
})

onMounted(() => {
  video.value?.addEventListener('playing', () => emit('playing', true))
  video.value?.addEventListener('pause', () => emit('playing', false))
})

onUnmounted(() => {
  video.value?.removeEventListener('playing', () => emit('playing', true))
  video.value?.removeEventListener('pause', () => emit('playing', false))
})
</script>

<template>
  <video
    v-if="asset"
    ref="video"
    :src="src"
    playsinline
    autoplay
    :muted="isMuted"
    loop
    class="size-full object-cover"
    :class="ratioMap[ratio]"
  />
</template>
