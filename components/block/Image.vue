<script lang="ts" setup>
import type { BlockImageStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockImageStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div data-component="BlockImage" v-editable="block">
    <Screen :log="{ columnStart: block.column_start, columnSpan: block.column_span }" />
    <NuxtImg provider="storyblok" :src="block.image.filename" :alt="block.image.alt" />
  </div>
</template>
