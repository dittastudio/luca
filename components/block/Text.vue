<script lang="ts" setup>
import { hasRichTextContent } from '@/utilities/helpers'
import type { BlockTextStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockTextStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="block-text prose prose--large wrapper"
  >
    <StoryblokRichText
      v-if="hasRichTextContent(block.text)"
      :content="block.text"
    />
  </div>
</template>

<style lang="postcss">
.block-text {
  text-align: center;

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
