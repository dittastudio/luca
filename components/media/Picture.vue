<script lang="ts" setup>
import {
  calculateTransformationParams,
  generateImageSrc,
  generateImageSrcset,
} from '@/utilities/image'

interface Props {
  class?: string
  url: string
  ratio?: Luca.TAspectRatios
  sizes?: string
  alt?: string
  width: number
  height?: number
  widths?: number[]
  loading?: 'lazy' | 'eager'
}

const {
  url,
  ratio,
  sizes,
  alt,
  width: providedWidth,
  height: providedHeight,
  widths = [500, 300, 100],
  loading = 'lazy',
} = defineProps<Props>()

const { width, height, transformationParams } = calculateTransformationParams(
  providedWidth,
  providedHeight,
  ratio,
)
const src = generateImageSrc(url, transformationParams, providedWidth)
const srcset = generateImageSrcset(url, transformationParams, widths)
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
