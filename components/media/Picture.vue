<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import { screenSizes } from '@/tailwind.config'
import { ratioDimensions, storyblokImage, storyblokImageDimensions } from '@/utilities/helpers'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  class?: string
  src: string
  ratio?: Luca.TAspectRatios | string | number | undefined
  widths?: number[]
  sizes?: typeof screenSizes
  lazy?: boolean
}

const {
  class: className,
  src,
  ratio,
  widths = [360, 480, 640, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400],
  sizes,
  lazy = true,
} = defineProps<Props>()

const setWidth = ref<number>(ratioDimensions(ratio).width || storyblokImageDimensions(src).width)
const setHeight = ref<number>(ratioDimensions(ratio).height || storyblokImageDimensions(src).height)

const calculateHeight = (chosenWidth: number) => {
  return Math.round((setHeight.value / setWidth.value) * chosenWidth)
}

const setSrc = computed<string>(() => {
  const largestWidth = widths[widths.length - 1]

  return storyblokImage(src, { width: largestWidth, height: calculateHeight(largestWidth) })
})

const setSrcset = computed<string>(() => {
  return widths
    .map(w => `${storyblokImage(src, { width: w, height: calculateHeight(w) })} ${w}w`)
    .join(', ')
})

const setSizes = computed<string | undefined>(() => {
  if (!sizes)
    return

  // Sort sizes keys in descending order based on screen size
  const sortedOrderSizes = Object.keys(sizes).sort((a, b) => {
    const sizeA = screenSizes[a] || Number.parseInt(a) || 0
    const sizeB = screenSizes[b] || Number.parseInt(b) || 0
    return sizeB - sizeA
  })

  // Format the sorted sizes into correct syntax
  const formattedSizes = sortedOrderSizes
    .map((size) => {
      const screenSizesSize = screenSizes[size] || Number.parseInt(size) || 0
      if (screenSizesSize === 0 && size !== 'zero')
        return ''

      const sizeKey = size === 'zero' ? '' : `(min-width: ${screenSizesSize}px) `
      const sizeValue = `${sizes[size]}`
      return `${sizeKey}${sizeValue}`
    })

  return formattedSizes.join(', ')
})

const container = ref<HTMLDivElement | null>(null)
const ready = ref(!lazy)
const loaded = ref(!lazy)

const blurryPlaceholder = (size: number) => storyblokImage(src, { width: size, height: calculateHeight(size), blur: 3 })

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

const attrs = useAttrs() as { [key: string]: any }

const imgAttrs = computed(() => ({
  ...attrs,
  width: setWidth.value,
  height: setHeight.value,
  src: ready.value ? setSrc.value : '',
  srcset: ready.value ? setSrcset.value : '',
  sizes: ready.value ? setSizes.value : '',
  alt: attrs.value?.alt ?? '',
}))
</script>

<template>
  <div ref="container">
    <picture
      :class="className"
      class="media-picture"
    >
      <img
        v-if="lazy"
        class="media-picture__placeholder"
        :src="blurryPlaceholder(100)"
        alt="Placeholder"
        :width="100"
        :height="100"
      >

      <slot />

      <img
        v-bind="imgAttrs"
        class="media-picture__image"
        :class="[{ 'is-loaded': loaded, 'is-lazy': lazy }]"
        @load="loaded = true"
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

.media-picture__image {
  &.is-lazy {
    position: absolute;
    z-index: 1;
    inset: 0;

    opacity: 0;

    transition: opacity theme('transitionDuration.1500') theme('transitionTimingFunction.out');
  }

  &.is-loaded {
    opacity: 1;
  }
}

.media-picture__placeholder {
  pointer-events: none;
  filter: blur(8px);
}
</style>
