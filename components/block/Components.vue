<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

interface Props {
  content: PageStoryblok
}

const { content } = defineProps<Props>()
</script>

<template>
  <div
    data-component="BlockComponents"
    class="block-components"
  >
    <section
      v-for="block in content.blocks"
      :key="block._uid"
      class="block-components__item"
      :class="`block-components__item--${block.component}`"
    >
      <BlockCard
        v-if="block.component === 'block_card'"
        :block="block"
      />

      <BlockImage
        v-else-if="block.component === 'block_image'"
        :block="block"
      />

      <BlockSplit
        v-else-if="block.component === 'block_split'"
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

<style lang="postcss" scoped>
.block-components__item--block_image {
  & + & {
    margin-block-start: 10.5vw;
  }
}
</style>
