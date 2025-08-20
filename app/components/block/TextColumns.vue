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

<style scoped>
@reference "@/assets/css/main.css";

:deep(p) {
  max-width: none;
}

.block-text-columns {
  @variant md {
    display: grid;
    grid-template-columns: var(--app-grid);
    gap: var(--app-inner-gutter);
  }
}

.block-text-columns__container {
  @variant md {
    grid-column: 2 / span 10;
  }

  @variant 3xl {
    grid-column: 3 / span 8;
  }
}

.block-text-columns__title {
  margin-bottom: --spacing(6);
  font-size: var(--text-sm);
  text-align: center;

  @variant lg {
    margin-bottom: --spacing(18);
  }
}

.block-text-columns__columns {
  text-align: left;

  @variant lg {
    column-count: 2;
    column-gap: calc(var(--app-inner-gutter) * 5);
  }
}
</style>
