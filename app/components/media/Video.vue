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
  (event: 'mute'): void
}

const emit = defineEmits<Emits>()

const video = ref<HTMLVideoElement | null>(null)
const isIntersecting = ref(false)
const seen = ref(false)
const src = computed(() => seen.value ? asset?.filename ?? '' : '')
const isMuted = computed(() => muted || !active || !seen.value)
const shouldPlay = computed(() => seen.value && active && isIntersecting.value && !!src.value)

useIntersectionObserver(
  video,
  ([entry]) => {
    isIntersecting.value = entry?.isIntersecting ?? false
  },
  { rootMargin: '50% 0px 50% 0px', threshold: 0 },
)

watch(isIntersecting, (value) => {
  if (value) {
    seen.value = true
  }
}, { immediate: true })

watchEffect(() => {
  if (!video.value) {
    return
  }

  if (shouldPlay.value) {
    video.value.play()
  }
  else if (!video.value.paused) {
    video.value.pause()

    if (!muted) {
      emit('mute')
    }
  }
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
