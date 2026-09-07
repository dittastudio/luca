<script lang="ts" setup>
import type { StoryblokAsset } from '#storyblok-types'
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  asset: StoryblokAsset
  ratio?: Luca.TAspectRatios | string | number
  hasAudio?: boolean
  active?: boolean
}

const { asset, ratio = 'auto', hasAudio = false, active = true } = defineProps<Props>()

defineOptions({ inheritAttrs: false })

const video = ref<HTMLVideoElement | null>(null)
const isIntersecting = ref(false)
const seen = ref(false)
const muted = ref(true)
const src = computed(() => seen.value ? asset?.filename ?? '' : '')
const isMuted = computed(() => !hasAudio || muted.value || !active || !seen.value)
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
    muted.value = true
  }
})
</script>

<template>
  <UiMuteToggle
    v-if="asset && hasAudio"
    :muted="muted"
    v-bind="$attrs"
    @toggle="muted = !muted"
  >
    <video
      ref="video"

      :src="src"
      playsinline
      autoplay
      :muted="isMuted"
      loop
      class="size-full object-cover"
      :class="ratioMap[ratio]"
    />
  </UiMuteToggle>

  <video
    v-else-if="asset"
    ref="video"
    v-bind="$attrs"
    :src="src"
    playsinline
    autoplay
    muted
    loop
    class="size-full object-cover"
    :class="ratioMap[ratio]"
  />
</template>
