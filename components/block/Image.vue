<script lang="ts" setup>
import type { BlockImageStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockImageStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    data-component="BlockImage"
  >
    <NuxtImg
      provider="storyblok"
      :src="block.image.filename"
      :alt="block.image.alt"
    />
  </div>
</template>
