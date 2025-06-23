<script lang="ts" setup>
import type { BlockTextColumns } from '@@/.storyblok/types/285210/storyblok-components'

interface Props {
  block: BlockTextColumns
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="block-text-columns wrapper"
  >
    <div class="block-text-columns__container prose">
      <h2
        v-if="block.title"
        class="block-text-columns__title"
      >
        {{ block.title }}
      </h2>

      <div class="block-text-columns__columns">
        <StoryblokText
          v-if="storyblokRichTextContent(block.text)"
          :content="block.text"
        />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
:deep(p) {
  max-width: none;
}

.block-text-columns {
  @screen md {
    display: grid;
    grid-template-columns: var(--app-grid);
    gap: var(--app-inner-gutter);
  }
}

.block-text-columns__container {
  @screen md {
    grid-column: 2 / span 10;
  }

  @screen 3xl {
    grid-column: 3 / span 8;
  }
}

.block-text-columns__title {
  margin-bottom: theme('spacing.30');
  font-size: theme('fontSize.14');
  text-align: center;

  @screen lg {
    margin-bottom: theme('spacing.90');
  }
}

.block-text-columns__columns {
  text-align: left;

  @screen lg {
    column-count: 2;
    column-gap: calc(var(--app-inner-gutter) * 5);
  }
}
</style>
