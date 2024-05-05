<script lang="ts" setup>
import { screenSizes } from '@/tailwind.config'
import { ratioDimensions, storyblokImage, storyblokImageDimensions } from '@/utilities/helpers'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  src: string
  media: string
  ratio?: Luca.TAspectRatios | string | number | undefined
  widths?: number[]
  sizes?: typeof screenSizes
}

const {
  src,
  media,
  ratio,
  widths = [360, 480, 640, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400],
  sizes,
} = defineProps<Props>()

const setWidth = ref<number>(ratioDimensions(ratio).width || storyblokImageDimensions($attrs.src).width)
const setHeight = ref<number>(ratioDimensions(ratio).height || storyblokImageDimensions(src).height)

const calculateHeight = (chosenWidth: number) => {
  return Math.round((setHeight.value / setWidth.value) * chosenWidth)
}

const setMedia = computed<typeof screenSizes | 'landscape' | 'portrait' | undefined>(() => {
  if (!media) return

  const mediaSize = screenSizes[media]

  if (mediaSize) return `(min-width: ${mediaSize}px)`

  return `(orientation: ${media})`
})

const setSrcset = computed<string>(() => {
  return widths
    .map(w => `${storyblokImage(src, { width: w, height: calculateHeight(w) })} ${w}w`)
    .join(', ')
})

const setSizes = computed<string | undefined>(() => {
  if (!sizes) return

  // Sort sizes keys in descending order based on screen size
  const sortedOrderSizes = Object.keys(sizes).sort((a, b) => {
    const sizeA = screenSizes[a] || parseInt(a) || 0
    const sizeB = screenSizes[b] || parseInt(b) || 0
    return sizeB - sizeA
  })

  // Format the sorted sizes into correct syntax
  const formattedSizes = sortedOrderSizes
    .map((size) => {
      const screenSizesSize = screenSizes[size] || parseInt(size) || 0
      if (screenSizesSize === 0 && size !== 'zero') return ''

      const sizeKey = size === 'zero' ? '' : `(min-width: ${screenSizesSize}px) `
      const sizeValue = `${sizes[size]}`
      return `${sizeKey}${sizeValue}`
    })

  return formattedSizes.join(', ')
})
</script>

<template>
  <source
    v-bind="$attrs"
    :width="setWidth"
    :height="setHeight"
    :media="setMedia"
    :srcset="setSrcset"
    :sizes="setSizes"
  >
</template>
