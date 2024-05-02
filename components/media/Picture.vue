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
  // defaults https://medium.com/hceverything/applying-srcset-choosing-the-right-sizes-for-responsive-images-at-different-breakpoints-a0433450a4a3
  widths = [500, 300, 100],
  class: className = null,
  loading = 'lazy',
} = Astro.props as Props

const { width, height, transformationParams } = calculateTransformationParams(
  providedWidth,
  providedHeight,
  ratio,
)
const src = generateImageSrc(url, transformationParams, providedWidth)
const srcset = generateImageSrcset(url, transformationParams, widths)
const srcsetWebp = srcset.replaceAll(/\.(jpe?g|png)/g, '.webp')

const initialValues = `{
  url: '${url}',
  alt: ${alt ? `'${alt}'` : undefined},
  width: ${width},
  height: ${height},
  src: '${src}',
  srcset: '${srcset}',
  loading: '${loading}',
  srcsetWebp: '${srcsetWebp}',
}`
</script>

<template>
  <picture
    x-bind="`HybridImage(${JSON.stringify({widths,"
    ratio})})`
    x-data="{initialValues}"
    x-modelable="{url, width, height, alt}"
    x-model="image"
  >
    <source
      :srcset="srcsetWebp"
      type="image/webp"
    >

    <source
      :srcset="srcset"
      type="image/jpeg"
    >

    <img
      class="{className}"
      sizes="{sizes}"
      :loading="loading"
      :alt="alt"
      :width="width"
      :height="height"
      :src="src"
    >
  </picture>

<!-- <script>
  import Alpine from 'alpinejs'

  import {
    calculateTransformationParams,
    generateImageSrc,
    generateImageSrcset,
  } from '@/utils/media-transformer'

  document.addEventListener('alpine:init', () => {
    Alpine.bind(
      'HybridImage',
      ({ ratio, widths }: any) =>
        ({
          ':url'() {
            const { width, height, transformationParams } =
              calculateTransformationParams(this.width, this.height, ratio)

            this.width = width
            this.height = height

            if (this.url) {
              this.src = generateImageSrc(
                this.url,
                transformationParams,
                this.width,
              )
              this.srcset = generateImageSrcset(
                this.url,
                transformationParams,
                widths,
              )
              this.srcsetWebp = this.srcset.replaceAll(
                /\.(jpe?g|png)/g,
                '.webp',
              )
            }
          },
        }) as any,
    )
  })
</script> -->
</template>
