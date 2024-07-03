<script lang="ts" setup>
import type { BlockPlayerStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockPlayerStoryblok
}

interface OembedResponse {
  author_name: string
  author_url: string
  cache_age: number
  embed: string
  height: number
  html: string
  image: string
  provider_name: string
  provider_url: string
  title: string
  type: string
  url: string
  version: string
  width: string
}

interface OembedResult {
  data: OembedResponse
  error: boolean
}

const { block } = defineProps<Props>()

const options = {
  autoplay: block.autoplay ? 1 : 0,
  loop: block.autoplay ? 1 : 0,
  muted: block.autoplay ? 1 : 0,
  autopause: 1,
}

const url = useRequestURL()

// When we build static, we're on the server, so use the live function.
// This is to avoid CORS issues when fetching the oembed data.
// const origin = import.meta.dev ? url.origin : 'https://luca.restaurant'
const origin = url.origin

const { data: oembed } = await useAsyncData(
  'player-oembed',
  async () => await $fetch<OembedResult>(`${origin}/.netlify/functions/oembed`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: block.media_url,
      params: options,
    }),
  }),
)
</script>

<template>
  <div
    v-editable="block"
    class="block-player wrapper"
  >
    <div
      v-if="oembed?.data && !oembed.error"
      class="block-player__item"
      :class="{ 'aspect-16/9': ['Vimeo', 'YouTube'].includes(oembed.data.provider_name) }"
      v-html="oembed.data.html"
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
</style>
