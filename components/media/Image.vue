<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import { ratioDimensions } from '@/utilities/helpers'
import type { AssetStoryblok } from '@/types/storyblok'

interface Props {
  asset: AssetStoryblok
  ratio: number | string
  sizes: string
  alt?: string
  lazy?: boolean
}

const { asset, ratio, sizes, lazy = true } = defineProps<Props>()

const container = ref<HTMLDivElement | null>(null)
const loaded = ref(!lazy)
const seen = ref(false)
const src = ref(lazy ? '' : asset.filename)
const img = useImage()
const size = {
  width: ratioDimensions(ratio).width * 100,
  height: ratioDimensions(ratio).height * 100,
}
const placeholder = img(asset.filename,
  {
    width: size.width,
    height: size.height,
    quality: 50,
    blur: 50,
  },
)

useIntersectionObserver(
  container,
  ([{ target, isIntersecting }]) => {
    if (!(target instanceof HTMLDivElement)) return

    if (isIntersecting && !seen.value) {
      seen.value = true
      src.value = asset.filename
    }
  },
  { rootMargin: '0px 0px 0px 0px', threshold: 0.5 },
)
</script>

<template>
  <div
    ref="container"
    class="media-image"
  >
    <NuxtImg
      v-if="!lazy || seen"
      class="media-image__asset"
      :class="['media-image__asset', { 'is-loaded': loaded, 'is-lazy': lazy }]"
      :src="src"
      :alt="alt || asset.alt"
      :width="size.width"
      :height="size.height"
      :sizes="sizes"
      loading="lazy"
      @load="loaded = true"
    />

    <img
      v-if="lazy"
      class="media-image__placeholder"
      :src="`${placeholder}:blur(50)`"
      :width="size.width"
      :height="size.height"
      alt=""
    >
  </div>
</template>

<style lang="postcss" scoped>
.media-image {
  position: relative;
  overflow: hidden;

  &__asset {
    width: 100%;
    height: auto;

    &.is-lazy {
      position: absolute;
      inset: 0;
      z-index: 1;
      transition: opacity theme('transitionDuration.1000') theme('transitionTimingFunction.smooth');
      backface-visibility: hidden;
      opacity: 0;
    }

    &.is-loaded {
      opacity: 1;
    }
  }

  &__placeholder {
    pointer-events: none;
    width: 100%;
    height: auto;
  }
}
</style>
