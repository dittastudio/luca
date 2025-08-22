<script lang="ts" setup>
import type { BlockSplit } from '@@/.storyblok/types/285210/storyblok-components'

interface Props {
  block: BlockSplit
}

const { block } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
const route = useRoute()
const isStoryPage = computed(() => route.path.startsWith('/stories/') && route.path.length > 9) // Hack!
</script>

<template>
  <div
    v-editable="block"
    class="block-split wrapper"
    :class="{
      'block-split--reverse': block?.reversed,
      'block-split--story': isStoryPage,
    }"
  >
    <div class="block-split__picture">
      <MediaImage
        v-if="block.media && assetType === 'image'"
        class="block-split__media"
        :asset="block.media"
        :ratio="block.ratio"
        :sizes="`
          100vw
          sm:100vw
          md:${(5 / 12 * 100)}vw
          3xl:${(5 / 12 * 1800)}px
        `"
      />

      <MediaVideo
        v-else-if="block.media && assetType === 'video'"
        class="block-split__media"
        :asset="block.media"
        :ratio="block.ratio"
      />

      <p
        v-if="block.caption"
        class="block-split__caption"
      >
        {{ block.caption }}
      </p>
    </div>

    <div class="block-split__text">
      <div
        v-if="storyblokRichTextContent(block.text)"
        class="block-split__copy prose"
        :class="{ 'prose--large': !isStoryPage }"
      >
        <StoryblokText :content="block.text" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.block-split {
  @variant md {
    display: grid;
    grid-template-columns: var(--app-grid);
    gap: var(--app-inner-gutter);
    align-items: center;
  }
}

.block-split__picture {
  @variant md {
    grid-column: 1 / span 6;

    .block-split--reverse & {
      grid-column: 7 / span 6;
      order: 1;
    }

    .block-split--story & {
      grid-column: 2 / span 5;
    }

    .block-split--reverse.block-split--story & {
      grid-column: 7 / span 5;
    }
  }

  @variant lg {
    grid-column: 2 / span 5;

    .block-split--reverse & {
      grid-column: 7 / span 5;
    }
  }

  @variant 3xl {
    .block-split--story & {
      grid-column: 3 / span 4;
    }

    .block-split--reverse.block-split--story & {
      grid-column: 7 / span 4;
    }
  }
}

.block-split__media {
  border-radius: var(--radius-xs);
}

.block-split__caption {
  margin-block-start: 8px;
  font-style: italic;
}

.block-split__text {
  @variant md {
    --text-nudge: --spacing(4);
  }

  @variant lg {
    --text-nudge: --spacing(8);
  }

  @variant md {
    grid-column: 7 / span 6;
    padding-inline-start: var(--text-nudge);

    .block-split--reverse & {
      grid-column: 1 / span 6;
      padding-inline: 0 var(--text-nudge);
    }

    .block-split--story & {
      grid-column: 7 / span 5;
    }

    .block-split--reverse.block-split--story & {
      grid-column: 2 / span 5;
    }
  }

  @variant lg {
    grid-column: 8 / span 5;
    padding-inline: 0;

    .block-split--reverse & {
      grid-column: 2 / span 5;
    }

    .block-split--story & {
      padding-inline-start: var(--text-nudge);
    }

    .block-split--reverse.block-split--story & {
      padding-inline: 0 var(--text-nudge);
    }
  }

  @variant 3xl {
    .block-split--reverse & {
      grid-column: 3 / span 4;
    }

    .block-split--story & {
      grid-column: 7 / span 4;
    }

    .block-split--reverse.block-split--story & {
      grid-column: 3 / span 4;
    }
  }

  @variant max-md {
    .block-split__picture + & {
      margin-block-start: --spacing(12);
    }
  }
}

.block-split__copy {
  text-align: center;

  @variant md {
    text-align: left;
  }

  .block-split--story & {
    text-align: left;
  }

  & :deep(p) {
    max-width: 27.5em;
    margin-inline: auto;

    @variant md {
      margin-inline: 0;

      .block-split--reverse & {
        max-width: 22em;
      }
    }
  }

  .block-split--story & :deep(p) {
    max-width: 100%;
    margin-inline: 0;

    @variant md {
      max-width: 36em;
    }
  }
}
</style>
