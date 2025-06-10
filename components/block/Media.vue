<script lang="ts" setup>
import type { BlockMediaStoryblok } from '@/types/storyblok'

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
      <MediaImage
        v-if="block.media && assetType === 'image'"
        class="block-media__media"
        :asset="block.media"
        :ratio="block.ratio"
        :sizes="`
          100vw
          sm:100vw
          md:${columnSpan / 12 * 100}vw
          3xl:${columnSpan / 12 * 1800}px
        `"
      />

      <MediaVideo
        v-else-if="block.media && assetType === 'video'"
        class="block-media__media"
        :asset="block.media"
        :ratio="block.ratio"
      />

      <p v-if="block.caption" class="block-media__caption">
        {{ block.caption }}
      </p>
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

.block-media__caption {
  margin-block-start: theme('spacing.8');
  font-style: italic;
}
</style>
