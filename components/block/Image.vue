<script lang="ts" setup>
import type { BlockImageStoryblok } from '@/types/storyblok'
import { storyblokImageDimensions } from '@/utilities/helpers'

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
      :width="storyblokImageDimensions(block.image.filename).width"
      :height="storyblokImageDimensions(block.image.filename).height"
    />
  </div>
</template>
