<script lang="ts" setup>
import type { BlockPlayerStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockPlayerStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="block-player wrapper"
  >
    <div
      class="block-player__item aspect-16/9"
      v-html="block.vimeo.vimeo_oembed.response.html"
    />
  </div>
</template>

<style lang="postcss" scoped>
.block-player {
  @screen md {
    display: grid;
    grid-template-columns: var(--app-grid);
    gap: var(--app-inner-gutter);
  }
}

.block-player__item {
  overflow: hidden;
  background-color: theme('colors.black/5%');
  border-radius: theme('borderRadius.sm');

  @screen md {
    grid-column: 3 / span 8;
  }

  :deep(iframe) {
    width: 100%;
    height: 100%;
  }
}
</style>
