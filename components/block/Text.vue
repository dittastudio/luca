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
    data-component="BlockText"
  >
    <StoryblokRichText
      v-if="hasRichTextContent(block.text)"
      :content="block.text"
    />
  </div>
</template>
