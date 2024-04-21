<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

interface Props {
  content: PageStoryblok
}

const { content } = defineProps<Props>()
</script>

<template>
  <div data-component="BlokComponents">
    <section
      v-for="block in content.blocks"
      :key="block._uid"
    >
      <BlockImage
        v-if="block.component === 'block_image'"
        :block="block"
      />
      <BlockText
        v-else-if="block.component === 'block_text'"
        :block="block"
      />
      <BlockTextEditorial
        v-else-if="block.component === 'block_text_editorial'"
        :block="block"
      />
    </section>
  </div>
</template>
