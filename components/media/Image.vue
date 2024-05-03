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
const seen = ref(false)
const loaded = ref(!lazy)
const src = ref(lazy || !seen.value ? undefined : asset.filename)
const size = {
  width: ratioDimensions(ratio).width * 100,
  height: ratioDimensions(ratio).height * 100,
}
const img = useImage()
const placeholder = img(asset.filename,
  {
    width: size.width,
    height: size.height,
    quality: 10,
  },
)

useIntersectionObserver(
  container,
  ([{ target, isIntersecting }], observerElement) => {
    if (!(target instanceof HTMLDivElement)) return

    if (isIntersecting && !seen.value) {
      src.value = asset.filename
      seen.value = true
      observerElement.disconnect()
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
    <!-- v-if="!lazy || seen" -->
    <!-- :placeholder="placeholder" -->
    <NuxtImg
      class="media-image__asset"
      :class="['media-image__asset', { 'is-loaded': loaded, 'is-lazy': lazy }]"
      :src="src"
      :sizes="sizes"
      :width="size.width"
      :height="size.height"
      :alt="alt || asset.alt"
      loading="lazy"
      @load="loaded = true"
    />

    <img
      v-if="lazy"
      class="media-image__placeholder"
      :src="placeholder"
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
    filter: blur(20px);
    pointer-events: none;
    width: 100%;
    height: auto;
  }
}
</style>