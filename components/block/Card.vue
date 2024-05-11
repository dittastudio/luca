<script lang="ts" setup>
import type { BlockCardStoryblok } from '@/types/storyblok'
import { colEndMap, colStartMap } from '@/utilities/maps'
import { ratioDimensions } from '@/utilities/helpers'
import { storyblokAssetType } from '@/utilities/storyblok'

interface Props {
  block: BlockCardStoryblok
}

const { block } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
const columnSpan = computed(() => Number(block.column_end) - Number(block.column_start))
</script>

<template>
  <div
    v-editable="block"
    class="block-card wrapper"
  >
    <div
      :class="[
        colStartMap[block.column_start],
        colEndMap[block.column_end],
      ]"
    >
      <StoryblokLink :item="block.link">
        <CardMedia
          :title="block.title"
          :headline="block.headline"
        >
          <template #media>
            <MediaImage
              v-if="block.media && assetType === 'image'"
              class="block-card__media"
              :asset="block.media"
              :ratio="block.ratio"
              :sizes="`
                100vw
                sm:100vw
                md:${Number(columnSpan) / 12 * 100}vw
                3xl:${Number(columnSpan) / 12 * 1800}px
              `"
            />

            <MediaVideo
              v-else-if="block.media && assetType === 'video'"
              class="block-card__media"
              :asset="block.media"
              :ratio="block.ratio"
            />
          </template>
        </CardMedia>
      </StoryblokLink>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.block-card {
  @screen md {
    display: grid;
    grid-template-columns: var(--app-grid);
    gap: var(--app-inner-gutter);
  }
}

.block-card__media {
  border-radius: theme('borderRadius.sm');
}
</style>
