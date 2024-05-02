<script lang="ts" setup>
import type { BlockCardEditorialStoryblok } from '@/types/storyblok'
import { colSpanMap, colStartMap } from '@/utilities/maps'
import { ratioDimensions, storyblokAssetType } from '@/utilities/helpers'

interface Props {
  block: BlockCardEditorialStoryblok
}

const { block } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="block"
    class="block-card-editorial wrapper"
  >
    <div
      :class="[
        colSpanMap[block.column_span],
        colStartMap[block.column_start],
      ]"
    >
      <StoryblokLink :item="block.link">
        <figure>
          <NuxtImg
            v-if="block.media && assetType === 'image'"
            class="block-card-editorial__video"
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
            class="block-card-editorial__video"
            :asset="block.media"
            :ratio="block.ratio"
          />

          <figcaption
            v-if="block.title"
            class="block-card-editorial__caption type-body-large"
          >
            {{ block.title }}
          </figcaption>
        </figure>
      </StoryblokLink>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.block-card-editorial {
  @screen md {
    display: grid;
    grid-template-columns: var(--app-grid);
    gap: var(--app-inner-gutter);
  }
}

.block-card-editorial__video {
  background-color: theme('colors.black/5%');
  border-radius: theme('borderRadius.sm');
}

.block-card-editorial__caption {
  margin-block-start: theme('spacing.8');
  font-style: italic;
}
</style>
