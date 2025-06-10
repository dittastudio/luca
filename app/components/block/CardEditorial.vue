<script lang="ts" setup>
import type { BlockCardEditorialStoryblok } from '@@/types/storyblok'

interface Props {
  block: BlockCardEditorialStoryblok
}

const { block } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
const columnSpan = computed(() => Number(block.column_end) - Number(block.column_start))
</script>

<template>
  <div
    v-editable="block"
    class="block-card-editorial wrapper"
  >
    <div
      :class="[
        colStartMap[block.column_start],
        colEndMap[block.column_end],
      ]"
    >
      <StoryblokLink
        class="block-card-editorial__link"
        :item="block.link"
      >
        <figure>
          <MediaImage
            v-if="block.media && assetType === 'image'"
            class="block-card-editorial__media"
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
            class="block-card-editorial__media"
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

.block-card-editorial__link {
  display: block;
}

.block-card-editorial__media {
  border-radius: theme('borderRadius.sm');

  @media (hover: hover) {
    opacity: 1;
    transition: opacity theme('transitionDuration.500') theme('transitionTimingFunction.outQuart');

    .block-card-editorial__link:hover & {
      opacity: 0.8;
    }
  }
}

.block-card-editorial__caption {
  margin-block-start: theme('spacing.8');
  font-style: italic;
}
</style>
