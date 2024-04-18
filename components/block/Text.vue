<script lang="ts" setup>
import { hasRichTextContent } from '@/utilities/helpers'
import type { BlockTextStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockTextStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div data-component="BlockText" v-editable="block">
    <StoryblokRichText v-if="hasRichTextContent(block.text)" :content="block.text" />
  </div>
</template>
