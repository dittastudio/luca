<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import { ratioDimensions, storyblokImage, storyblokImageDimensions } from '@/utilities/helpers'
import { screenSizes } from '@/tailwind.config'
import { calculateHeight, setBlurryPlaceholder, setSizes } from '@/utilities/images'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  class?: string
  src: string
  ratio?: Luca.TAspectRatios | string | number | undefined
  widths?: number[]
  sizes?: any
  lazy?: boolean
  media?: string
  mediaSrc?: string
  mediaRatio?: Luca.TAspectRatios | string | number | undefined
  mediaSizes?: any
}

const {
  class: className,
  src,
  ratio,
  widths = [360, 480, 640, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400],
  sizes,
  lazy = true,
  media,
  mediaSrc,
  mediaRatio,
  mediaSizes,
} = defineProps<Props>()

const setWidth = ref<number>(ratioDimensions(ratio).width || storyblokImageDimensions(src).width)
const setHeight = ref<number>(ratioDimensions(ratio).height || storyblokImageDimensions(src).height)

const setMediaWidth = ref<number>(ratioDimensions(mediaRatio).width || storyblokImageDimensions(mediaSrc).width || setWidth.value)
const setMediaHeight = ref<number>(ratioDimensions(mediaRatio).height || storyblokImageDimensions(mediaSrc).height || setHeight.value)

const setSrc = computed<string>(() => {
  const largestWidth = widths[widths.length - 1]

  return storyblokImage(src, { width: largestWidth, height: calculateHeight(setWidth.value, setHeight.value, largestWidth) })
})

const setSrcset = computed<string>(() => {
  return widths
    .map(w => `${storyblokImage(src, { width: w, height: calculateHeight(setWidth.value, setHeight.value, w) })} ${w}w`)
    .join(', ')
})

const setMediaSrcset = computed<string>(() => {
  return widths
    .map(w => `${storyblokImage(src, { width: w, height: calculateHeight(setMediaWidth.value, setMediaHeight.value, w) })} ${w}w`)
    .join(', ')
})

const setMedia = computed<keyof typeof screenSizes | 'landscape' | 'portrait' | any>(() => {
  if (!media)
    return

  const mediaBreakpoint = screenSizes[media]

  if (mediaBreakpoint)
    return `(min-width: ${mediaBreakpoint}px)`

  return `(orientation: ${media})`
})

const container = ref<HTMLDivElement | null>(null)
const ready = ref(!lazy)
const loaded = ref(!lazy)

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
  { rootMargin: '0px 0px 0px 0px', threshold: 0.5 },
)
</script>

<template>
  <div ref="container" class="media-picture" :class="className">
    <picture class="block">
      <source
        :media="setMedia"
        :width="setMediaWidth"
        :height="setMediaHeight"
        :srcset="ready ? setMediaSrcset : ''"
        :sizes="setSizes(mediaSizes)"
      >

      <img
        class="media-image__asset"
        :class="{ 'is-loaded': loaded, 'is-lazy': lazy }"
        v-bind="$attrs"
        :width="setWidth"
        :height="setHeight"
        :src="ready ? setSrc : ''"
        :srcset="ready ? setSrcset : ''"
        :sizes="setSizes(sizes)"
        @load="loaded = true"
      >
    </picture>

    <picture v-if="lazy" class="block">
      <source
        :media="setMedia"
        :width="setMediaWidth"
        :height="setMediaHeight"
        :srcset="setBlurryPlaceholder(src, setMediaWidth, setMediaHeight, 100)"
      >

      <img
        class="media-picture__placeholder"
        :src="setBlurryPlaceholder(src, setWidth, setHeight, 100)"
        alt="Placeholder"
        :width="setWidth"
        :height="setHeight"
      >
    </picture>
  </div>
</template>

<style lang="postcss" scoped>
.media-picture {
  position: relative;
  overflow: hidden;
  display: block;
  height: inherit;
}

.media-picture__asset {
  &.is-lazy {
    position: absolute;
    z-index: 1;
    inset: 0;

    backface-visibility: hidden;
    opacity: 0;

    transition: opacity theme('transitionDuration.1000') theme('transitionTimingFunction.smooth');
  }

  &.is-loaded {
    opacity: 1;
  }
}

.media-picture__placeholder {
  pointer-events: none;
  backface-visibility: hidden;
}
</style>
