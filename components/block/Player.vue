<script lang="ts" setup>
import type { BlockPlayerStoryblok } from '@/types/storyblok'
import { objectToUrlParams } from '@/utilities/helpers'

interface Props {
  block: BlockPlayerStoryblok
}

const { block } = defineProps<Props>()

const options = {
  autoplay: block.autoplay ? 1 : 0,
  loop: block.autoplay ? 1 : 0,
  muted: block.autoplay ? 1 : 0,
  autopause: 1,
}

const params = objectToUrlParams(options)
</script>

<template>
  <div
    v-editable="block"
    class="block-player wrapper"
  >
    <iframe
      v-if="block.vimeo?.vimeo_oembed?.response"
      class="block-player__item aspect-16/9"
      :src="`https://player.vimeo.com/video/${block.vimeo.vimeo_oembed.response.video_id}?${params}`"
      :width="block.vimeo.vimeo_oembed.response.width"
      :height="block.vimeo.vimeo_oembed.response.height"
      frameborder="0"
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
      :title="block.vimeo.vimeo_oembed.response.title"
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
  border-radius: theme('borderRadius.sm');
  width: 100%;
  height: 100%;

  @screen md {
    grid-column: 3 / span 8;
  }
}
</style>
