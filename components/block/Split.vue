<script lang="ts" setup>
import type { BlockSplitStoryblok } from '@/types/storyblok'
import { hasRichTextContent, ratioDimensions, storyblokAssetType } from '@/utilities/helpers'

interface Props {
  block: BlockSplitStoryblok
}

const { block } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="block"
    :class="['block-split wrapper', { 'block-split--reverse': block?.reversed }]"
  >
    <div class="block-split__media">
      <NuxtImg
        v-if="block.media && assetType === 'image'"
        provider="storyblok"
        class="block-split__image"
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

    <div class="block-split__text">
      <div
        v-if="hasRichTextContent(block.text)"
        class="block-split__copy prose prose--large"
      >
        <StoryblokRichText :content="block.text" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.block-split {
  @screen md {
    display: grid;
    grid-template-columns: var(--app-grid);
    gap: var(--app-inner-gutter);
    align-items: center;
  }
}

.block-split__media {
  @screen md {
    grid-column: 1 / span 5;

    .block-split--reverse & {
      grid-column: 8 / span 5;
      order: 1;
    }
  }

  @screen lg {
    grid-column: 2 / span 5;

    .block-split--reverse & {
      grid-column: 7 / span 5;
    }
  }

  @screen 3xl {
    grid-column: 2 / span 5;

    .block-split--reverse & {
      grid-column: 7 / span 5;
    }
  }
}

.block-split__image {
  border-radius: theme('borderRadius.sm');
}

.block-split__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  @screen md {
    grid-column: 7 / span 6;
    text-align: left;

    .block-split--reverse & {
      grid-column: 1 / span 6;
    }
  }

  @screen lg {
    grid-column: 8 / span 5;
    text-align: left;

    .block-split--reverse & {
      grid-column: 2 / span 5;
    }
  }

  @screen 3xl {
    grid-column: 8 / span 4;

    .block-split--reverse & {
      grid-column: 3 / span 4;
    }
  }

  @screen mdMax {
    .block-split__media + & {
      margin-block-start: theme('spacing.60');
    }
  }
}

.block-split__copy {
  & p {
    max-width: 27.5em;
    margin-inline: auto;

    @screen md {
      margin-inline: 0;

      .block-split--reverse & {
        max-width: 22em;
      }
    }
  }
}
</style>
