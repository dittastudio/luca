<script lang="ts" setup>
import type { BlockCardStoryblok } from '@/types/storyblok'
import { colSpanMap, colStartMap } from '@/utilities/maps'
import { storyblokAssetType, gridColSpan } from '@/utilities/helpers'

interface Props {
  block: BlockCardStoryblok
}

const { block } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="block"
    class="block-card wrapper"
  >
    <div
      :class="[
        colSpanMap[block.column_span],
        colStartMap[block.column_start],
      ]"
    >
      <StoryblokLink :item="block.link">
        <CardMedia
          :title="block.title"
          :headline="block.headline"
        >
          <template #media>
            <MediaPicture
              v-if="block.media && assetType === 'image'"
              :src="block.media.filename"
              :alt="block.media.alt || block.title"
              :ratio="block.ratio"
              :sizes="{
                'zero': gridColSpan('zero', 1, 1),
                'md': gridColSpan('md', Number(block.column_span)),
                '2xl': gridColSpan('2xl', Number(block.column_span)),
                '3xl': gridColSpan('3xl', Number(block.column_span)),
              }"
              loading="lazy"
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
  background-color: theme('colors.black/5%');
  border-radius: theme('borderRadius.sm');
}
</style>
