<script lang="ts" setup>
import type { BlockMediaStoryblok } from '@/types/storyblok'
import { colSpanMap, colStartMap } from '@/utilities/maps'
import { ratioDimensions, storyblokAssetType } from '@/utilities/helpers'

interface Props {
  block: BlockMediaStoryblok
}

const { block } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
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
        v-if="block.media && assetType === 'image'"
        class="block-card__image"
        provider="storyblok"
        :src="block.media.filename"
        :alt="block.media.alt"
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
        v-else-if="block.media && assetType === 'video'"
        :asset="block.media"
        :ratio="block.ratio"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.block-image {
  @screen md {
    display: grid;
    grid-template-columns: var(--app-grid);
    gap: var(--app-inner-gutter);
  }
}

.block-image__image {
  border-radius: theme('borderRadius.sm');
}
</style>
