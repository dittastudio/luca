<script lang="ts" setup>
import { hasRichTextContent } from '@/utilities/helpers'
import type { BlockTextEditorialStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockTextEditorialStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    data-component="BlockTextEditorial"
  >
    <h2 v-if="block.title">
      {{ block.title }}
    </h2>
    <StoryblokRichText
      v-if="hasRichTextContent(block.text)"
      :content="block.text"
      class="text-editorial__columns"
    />
  </div>
</template>

<style lang="postcss" scoped>
:deep(p) {
  margin-bottom: theme('spacing.20');
  color: black;
}

.text-editorial__columns {
  @screen md {
    column-count: 2;
    column-gap: theme('spacing.40');
  }
}
</style>
