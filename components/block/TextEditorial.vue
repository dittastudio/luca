<script lang="ts" setup>
import { hasRichTextContent } from '@/utilities/helpers'
import type { BlockTextEditorialStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockTextEditorialStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="block-text-editorial prose"
  >
    <h2
      v-if="block.title"
      class="block-text-editorial__title"
    >
      {{ block.title }}
    </h2>

    <StoryblokRichText
      v-if="hasRichTextContent(block.text)"
      :content="block.text"
      class="block-text-editorial__columns"
    />
  </div>
</template>

<style lang="postcss" scoped>
:deep(p) {
  max-width: none;
}

.block-text-editorial {
  width: 100%;
  max-width: theme('screens.xl');
  margin-inline: auto;
  padding-inline: var(--app-outer-gutter);
  /* color: theme('colors.green'); */

  &__title {
    text-align: center;
    font-size: theme('fontSize.14');
    margin-bottom: theme('spacing.30');

    @screen lg {
      margin-bottom: theme('spacing.90');
    }
  }

  &__columns {
    text-align: left;

    @screen lg {
      column-count: 2;
      column-gap: theme('spacing.60');
    }
  }
}
</style>
