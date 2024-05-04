<script lang="ts" setup>
interface Props {
  url: string
  alt: string
  width: number
  height?: number
  widths?: number[]
  sizes?: string
}

const {
  url,
  alt,
  width,
  height,
  widths = [500, 300, 100],
  sizes,
} = defineProps<Props>()

// const { width, height, transformationParams } = calculateTransformationParams(
//   providedWidth,
//   providedHeight,
//   ratio,
// )
// const src = generateImageSrc(url, transformationParams, providedWidth)
// const srcset = generateImageSrcset(url, transformationParams, widths)
</script>

<template>
  <picture>
    <source
      :srcset="srcset"
      media=""
    >

    <img
      :sizes="sizes"
      :loading="loading"
      :alt="alt"
      :width="width"
      :height="height"
      :src="src"
    >
  </picture>
</template>
