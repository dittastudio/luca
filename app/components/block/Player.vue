<script lang="ts" setup>
import type { BlockPlayerStoryblok } from '@@/types/storyblok'

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

const { data: oembed, error } = await useAsyncData(
  block._uid,
  async () => await $fetch('/api/oembed', {
    method: 'post',
    body: {
      url: block.media_url,
      params: options,
    },
  }),
)
</script>

<template>
  <div
    v-editable="block"
    class="block-player wrapper"
  >
    <div
      v-if="error"
      class="block-player__error prose prose--large"
    >
      <p>Error ({{ error.statusCode }}) getting player:</p>

      <p>{{ error.statusMessage }}</p>
    </div>

    <div
      v-if="oembed && !error"
      class="block-player__media"
      :class="{ 'aspect-16/9': ['Vimeo', 'YouTube'].includes(oembed.provider_name) }"
      v-html="oembed.html"
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

  &__error {
    max-width: 25em;
    text-align: center;
    margin-inline: auto;
    grid-column: 1 / -1;
  }

  &__media {
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: theme('colors.black/5%');
    border-radius: theme('borderRadius.sm');

    @screen md {
      grid-column: 3 / span 8;
    }

    :deep(iframe) {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
}
</style>
