<script lang="ts" setup>
import type { BlockMediaStoryblok } from '@/types/storyblok'
import { colSpanMap, colStartMap } from '@/utilities/maps'
import { ratioDimensions } from '@/utilities/helpers'

interface Props {
  block: BlockMediaStoryblok
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
        v-if="block.media[0]?.component === 'image' && block.media[0]?.image"
        class="block-image__image"
        provider="storyblok"
        :src="block.media[0]?.image.filename"
        :alt="block.media[0]?.image.alt"
        :width="ratioDimensions(block.ratio).width"
        :height="ratioDimensions(block.ratio).height"
        :sizes="`
          100vw
          sm:100vw
          md:${Number(block.column_span) / 12 * 100}vw
          3xl:${Number(block.column_span) / 12 * 1800}px
        `"
        loading="lazy"
      />

      <MediaVideo
        v-else-if="block.media[0]?.component === 'video' && block.media[0]?.video"
        :asset="block.media[0]?.video"
        :ratio="block.ratio"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.block-image {
  @screen md {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: var(--app-inner-gutter);
  }
}

.block-image__image {
  border-radius: theme('borderRadius.sm');
}
</style>
