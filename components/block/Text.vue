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

  & p {
    max-width: 25em;
    margin-inline: auto;
  }
}
</style>
