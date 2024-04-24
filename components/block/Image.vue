<script lang="ts" setup>
import type { BlockImageStoryblok } from '@/types/storyblok'
import { colSpanMap, colStartMap } from '@/utilities/maps'
import { storyblokImageDimensions } from '@/utilities/helpers'

interface Props {
  block: BlockImageStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="block-image wrapper"
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
          sm:100vw
          md:${Number(block.column_span) / 12 * 100}vw
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
