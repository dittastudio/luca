<script lang="ts" setup>
import type { BlockImageStoryblok } from '@/types/storyblok'
import { storyblokImageDimensions } from '@/utilities/helpers'

interface Props {
  block: BlockImageStoryblok
}

const { block } = defineProps<Props>()

const colSpanMap = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
} as any

const colStartMap = {
  1: 'col-start-1',
  2: 'col-start-2',
  3: 'col-start-3',
  4: 'col-start-4',
  5: 'col-start-5',
  6: 'col-start-6',
  7: 'col-start-7',
  8: 'col-start-8',
  9: 'col-start-9',
  10: 'col-start-10',
  11: 'col-start-11',
  12: 'col-start-12',
} as any
</script>

<template>
  <div
    v-editable="block"
    data-component="BlockImage"
    class="block-image"
  >
    <div
      :class="[
        colSpanMap[block.column_span],
        colStartMap[block.column_start],
      ]"
    >
      <NuxtImg
        provider="storyblok"
        :src="block.image.filename"
        :alt="block.image.alt"
        :width="storyblokImageDimensions(block.image.filename).width"
        :height="storyblokImageDimensions(block.image.filename).height"
        :sizes="`
          100vw
          xs:100vw
          sm:${Number(block.column_span) / 12 * 100}vw
          md:${Number(block.column_span) / 12 * 100}vw
          lg:${Number(block.column_span) / 12 * 100}vw
          xl:${Number(block.column_span) / 12 * 100}vw
          2xl:${Number(block.column_span) / 12 * 100}vw
          3xl:${Number(block.column_span) / 12 * 1800}px
        `"
        loading="lazy"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.block-image {
  @screen sm {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: var(--app-inner-gutter);
  }
}
</style>
