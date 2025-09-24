<script lang="ts" setup>
import type { BlockPlayer } from '@@/.storyblok/types/285210/storyblok-components'

interface Props {
  block: BlockPlayer
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
    class="wrapper md:grid md:grid-cols-(--app-grid) md:gap-(--app-inner-gutter)"
  >
    <div
      v-if="error"
      class="prose prose--large max-w-[25em] mx-auto text-center col-span-full"
    >
      <p>Error ({{ error.statusCode }}) getting player:</p>

      <p>{{ error.statusMessage }}</p>
    </div>

    <div
      v-if="oembed && !error"
      class="block-player__media overflow-hidden size-full rounded-xs bg-black/5 md:col-start-3 md:col-span-8"
      :class="{ 'aspect-16/9': ['Vimeo', 'YouTube'].includes(oembed.provider_name) }"
      v-html="oembed.html"
    />
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.block-player__media {
  :deep(iframe) {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
