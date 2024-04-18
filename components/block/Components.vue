<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

interface Props {
  content: PageStoryblok
}

const { content } = defineProps<Props>()
const spacingTop = ['block_text']
const spacingBottom = ['block_text']
</script>

<template>
  <div data-component="BlokComponents">
    <section
      v-for="block in content.blocks"
      :key="block._uid"
      :class="[
        {
          'spacing-top-classes-here-will': spacingTop.includes(block.component),
          'spacing-bottom-classes-here-will': spacingBottom.includes(block.component),
        },
      ]"
    >
      <BlockText v-if="block.component === 'block_text'" :block="block" />
    </section>
  </div>
</template>
