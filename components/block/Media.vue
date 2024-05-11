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
const columnSpan = computed(() => Number(block.column_end) - Number(block.column_start))
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
      <MediaPicture
        v-if="block.media && assetType === 'image'"
        class="block-media__media"
        :src="block.media.filename"
        :alt="block.media.alt"
        :ratio="block.ratio"
        :sizes="{
          'zero': { columnSpan: 12 },
          'md': { columnSpan },
          '2xl': { columnSpan },
          '3xl': { columnSpan },
        }"
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
