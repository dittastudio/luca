<script lang="ts" setup>
import type { BlockCardStoryblok } from '@/types/storyblok'
import { colEndMap, colStartMap } from '@/utilities/maps'
import { storyblokAssetType } from '@/utilities/storyblok'

interface Props {
  block: BlockCardStoryblok
}

const { block } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
const columnSpan = computed(() => ((Number(block.column_end) - Number(block.column_start)) + 1))
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
      <StoryblokLink
        class="block"
        :item="block.link"
      >
        <CardMedia
          :title="block.title"
          :headline="block.headline"
        >
          <template #media>
            <MediaPicture
              v-if="block.media && assetType === 'image'"
              class="block-card__media"
              :src="block.media.filename"
              :alt="block.media.alt || block.title"
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
