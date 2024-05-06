<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import { ratioDimensions, storyblokImage, storyblokImageDimensions } from '@/utilities/helpers'
import { screenSizes } from '@/tailwind.config'
import { gridColSpan } from '@/utilities/images'

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
    .map((size: any) => {
      // console.log(size)
      const screenSizesSize = screenSizes[size] || Number.parseInt(size) || 0
      if (screenSizesSize === 0 && size !== 'zero')
        return ''

      const sizeKey = size === 'zero' ? '' : `(min-width: ${screenSizesSize}px) `
      const sizeValue = sizes[size]

      if (typeof sizes[size] === 'object') {
        return gridColSpan({
          breakpoint: sizes[size],
          columnSpan: sizes[size]?.columnSpan,
          totalColumns: sizes[size]?.totalColumns | 12,
        })
      }

      return `${sizeKey}${sizeValue}`
    })

  return formattedSizes.join(', ')
})

const picture = ref<HTMLPictureElement | null>(null)
const ready = ref(!lazy)
const loaded = ref(!lazy)

const blurryPlaceholder = (size: number) => storyblokImage(src, { width: size, height: calculateHeight(size), blur: 3 })

useIntersectionObserver(
  picture,
  ([{ target, isIntersecting }], observerElement) => {
    if (!(target instanceof HTMLPictureElement))
      return

    if (isIntersecting && !ready.value) {
      ready.value = true
      observerElement.disconnect()
    }
  },
  { rootMargin: '0px 0px 0px 0px', threshold: 0.25 },
)

// const attrs = useAttrs() as { [key: string]: any }

// const imgAttrs = computed(() => ({
//   ...attrs,
//   width: setWidth.value,
//   height: setHeight.value,
//   src: ready.value ? setSrc.value : '',
//   srcset: ready.value ? setSrcset.value : '',
//   sizes: ready.value ? setSizes.value : '',
//   alt: attrs.value?.alt ?? '',
// }))
</script>

<template>
  <picture
    ref="picture"
    :class="className"
    class="media-picture"
  >
    <Transition name="placeholder">
      <img
        v-if="lazy && !loaded"
        class="media-picture__placeholder"
        :src="blurryPlaceholder(100)"
        alt="Placeholder"
        :width="100"
        :height="100"
      >
    </Transition>

    <slot />

    <img
      v-bind="$attrs"
      :width="setWidth"
      :height="setHeight"
      :src="ready ? setSrc : ''"
      :srcset="ready ? setSrcset : ''"
      :sizes="ready ? setSizes : ''"
      alt=""
      class="media-picture__image"
      :class="{ 'media-picture__image--hidden': lazy && !ready && !loaded }"
      @load="loaded = true"
    >
  </picture>
</template>

<style lang="postcss" scoped>
.media-picture {
  position: relative;
  overflow: hidden;
  display: block;
  height: inherit;
}

.media-picture__image {
  &--hidden {
    opacity: 0;
  }
}

.placeholder-enter-active,
.placeholder-leave-active {
  transition: opacity theme('transitionDuration.1500') theme('transitionTimingFunction.out');
}
.placeholder-enter-from,
.placeholder-leave-to {
  opacity: 0;
}

.media-picture__placeholder {
  pointer-events: none;

  position: absolute;
  z-index: 1;
  inset: 0;

  filter: blur(8px);
}
</style>
