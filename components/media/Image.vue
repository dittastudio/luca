<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import { ratioDimensions } from '@/utilities/helpers'
import type { AssetStoryblok } from '@/types/storyblok'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as { [key: string]: any }

interface Props {
  asset: AssetStoryblok
  ratio: number | string
  sizes: string
  alt?: string
  lazy?: boolean
}

const { asset, ratio, sizes, lazy = true } = defineProps<Props>()

const container = ref<HTMLDivElement | null>(null)
const ready = ref(!lazy)
const loaded = ref(!lazy)

const size = {
  width: ratioDimensions(ratio).width * 100,
  height: ratioDimensions(ratio).height * 100,
}

const placeholderImg = useImage()
const placeholder = placeholderImg(asset.filename, {
  width: size.width,
  height: size.height,
  quality: 10,
})

useIntersectionObserver(
  container,
  ([{ target, isIntersecting }], observerElement) => {
    if (!(target instanceof HTMLDivElement))
      return

    if (isIntersecting && !ready.value) {
      ready.value = true
      observerElement.disconnect()
    }
  },
  { rootMargin: '0px 0px 0px 0px', threshold: 0.25 },
)

const imgMain = useImage()

const imgInfo = computed(() => imgMain.getSizes(asset.filename, {
  provider: 'storyblok',
  sizes,
  modifiers: {
    width: size.width,
    height: size.height,
    quality: 80,
  },
}))

const { class: className, ...rest } = attrs

const imgAttrs = computed(() => ({
  ...rest,
  width: size.width,
  height: size.height,
  src: ready.value ? asset.filename : '',
  sizes: ready.value ? imgInfo.value.sizes : '',
  srcset: ready.value ? imgInfo.value.srcset : '',
  alt: attrs.value?.alt ?? asset.alt ?? '',
  loading: 'lazy' as 'lazy' | 'eager',
}))
</script>

<template>
  <div
    ref="container"
    class="media-image"
    :class="className"
  >
    <img
      v-bind="imgAttrs"
      class="media-image__asset"
      :class="[{ 'is-loaded': loaded, 'is-lazy': lazy }]"
      @load="loaded = true"
    >

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
