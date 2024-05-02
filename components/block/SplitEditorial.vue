<script lang="ts" setup>
import type { BlockSplitEditorialStoryblok } from '@/types/storyblok'
import { hasRichTextContent, ratioDimensions, storyblokAssetType } from '@/utilities/helpers'

interface Props {
  block: BlockSplitEditorialStoryblok
}

const { block } = defineProps<Props>()

const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="block"
    :class="[
      'block-split-editorial wrapper',
      { 'block-split-editorial--reverse': block?.reversed },
    ]"
  >
    <div class="block-split-editorial__media">
      <NuxtImg
        v-if="block.media && assetType === 'image'"
        provider="storyblok"
        class="block-split-editorial__image"
        :src="block.media.filename"
        :alt="block.media.alt"
        :width="ratioDimensions(block.ratio).width"
        :height="ratioDimensions(block.ratio).height"
        :sizes="`
          100vw
          sm:100vw
          md:${(5 / 12 * 100)}vw
          3xl:${(5 / 12 * 1800)}px
        `"
        loading="lazy"
      />

      <MediaVideo
        v-else-if="block.media && assetType === 'video'"
        :asset="block.media"
        :ratio="block.ratio"
      />
    </div>

    <div
      v-if="hasRichTextContent(block.text)"
      class="block-split-editorial__text"
    >
      <div class="block-split-editorial__copy prose">
        <StoryblokRichText :content="block.text" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.block-split-editorial {
  display: grid;
  grid-template-columns: var(--app-grid);
  gap: var(--app-inner-gutter);
  align-items: flex-start;
}

.block-split-editorial__media {
  grid-column: 1 / span 1;

  .block-split-editorial--reverse & {
    grid-column: 2 / span 1;
  }

  @screen sm {
    grid-column: 1 / span 2;

    .block-split-editorial--reverse & {
      grid-column: 3 / span 2;
    }
  }

  @screen md {
    grid-column: 2 / span 5;

    .block-split-editorial--reverse & {
      grid-column: 7 / span 5;
      order: 1;
    }
  }

  @screen lg {
    grid-column: 2 / span 5;

    .block-split-editorial--reverse & {
      grid-column: 7 / span 5;
    }
  }

  @screen 3xl {
    grid-column: 3 / span 4;

    .block-split-editorial--reverse & {
      grid-column: 7 / span 4;
    }
  }

  &:not(:only-child) {
    margin-block-start: theme('spacing.60');

    @screen md {
      margin-block-start: theme('spacing.120');
    }
  }
}

.block-split-editorial__image {
  background-color: theme('colors.black/10%');
  border-radius: theme('borderRadius.sm');
}

.block-split-editorial__text {
  grid-column: 1 / -1;

  @screen mdMax {
    order: -1;
  }

  @screen md {
    grid-column: 7 / span 5;

    .block-split-editorial--reverse & {
      grid-column: 2 / span 5;
    }
  }

  @screen lg {
    grid-column: 7 / span 5;

    .block-split-editorial--reverse & {
      grid-column: 2 / span 5;
    }
  }

  @screen 3xl {
    grid-column: 7 / span 4;

    .block-split-editorial--reverse & {
      grid-column: 3 / span 4;
    }
  }

  @screen mdMax {
    .block-split-editorial__media + & {
      margin-block-start: theme('spacing.60');
    }
  }
}

.block-split-editorial__copy {
  --text-nudge: 0;

  @screen md {
    --text-nudge: theme('spacing.20');
  }

  @screen lg {
    --text-nudge: theme('spacing.40');
  }

  padding-left: var(--text-nudge);

  .block-split-editorial--reverse & {
    padding-right: var(--text-nudge);
    padding-left: 0;
  }

  & p {
    max-width: 36em;
  }
}
</style>
