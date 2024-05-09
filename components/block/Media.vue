<script lang="ts" setup>
import type { BlockMediaStoryblok } from '@/types/storyblok'
import { colEndMap, colStartMap } from '@/utilities/maps'
import { ratioDimensions } from '@/utilities/helpers'
import { storyblokAssetType } from '@/utilities/storyblok'

interface Props {
  block: BlockMediaStoryblok
}

const { block } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="block"
    class="block-media wrapper"
  >
    <div
      :class="[
        colStartMap[block.column_start],
        colEndMap[block.column_end],
      ]"
    >
      <MediaImage
        v-if="block.media && assetType === 'image'"
        class="block-media__media"
        :asset="block.media"
        :ratio="block.ratio"
        :sizes="`
          100vw
          sm:100vw
          md:${Number(block.column_span) / 12 * 100}vw
          3xl:${Number(block.column_span) / 12 * 1800}px
        `"
      />

      <MediaVideo
        v-else-if="block.media && assetType === 'video'"
        class="block-media__media"
        :asset="block.media"
        :ratio="block.ratio"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.block-media {
  @screen md {
    display: grid;
    grid-template-columns: var(--app-grid);
    gap: var(--app-inner-gutter);
  }
}

.block-media__media {
  border-radius: theme('borderRadius.sm');
}
</style>
