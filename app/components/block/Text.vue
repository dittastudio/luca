<script lang="ts" setup>
import type { BlockText } from '#storyblok-components'

interface Props {
  block: BlockText
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="block-text prose prose--large wrapper text-center"
  >
    <StoryblokText
      v-if="storyblokRichTextContent(block.text)"
      :html="block.text"
    />
  </div>
</template>

<style>
@reference "@/assets/css/app.css";

.block-text {
  & :is(h1, h2, h3, h4, h5, h6) {
    max-width: 36em;
    margin-inline: auto;
    text-wrap: balance;
  }

  & p {
    max-width: 25em;
    margin-inline: auto;
  }
}
</style>
