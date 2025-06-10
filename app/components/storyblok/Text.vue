<script lang="ts" setup>
import type { RichtextStoryblok } from '@@@/types/storyblok'
import { StoryblokRichText } from '@storyblok/vue'

interface Props {
  content?: RichtextStoryblok | undefined
}

const { content } = defineProps<Props>()
</script>

<template>
  <StoryblokRichText
    v-if="content"
    :doc="content"
  />
</template>
