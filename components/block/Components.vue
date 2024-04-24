<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

interface Props {
  content: PageStoryblok
}

const { content } = defineProps<Props>()
</script>

<template>
  <div class="block-components">
    <section
      v-for="block in content.blocks"
      :key="block._uid"
      class="block-components__item"
      :class="`block-components__item--${block.component}`"
    >
      <BlockButton
        v-if="block.component === 'block_button'"
        :block="block"
      />

      <BlockCard
        v-else-if="block.component === 'block_card'"
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

      <UiConnection v-if="block.connecting_line" />
    </section>
  </div>
</template>

<style lang="postcss" scoped>
.block-components__item {
  --spacing-rhythm: 15.75vw;
  & + & {
    margin-block-start: theme('spacing.150');

    @screen md {
      margin-block-start: var(--spacing-rhythm);
    }
  }
}

.block-components__item--block_card {
  & + & {
    margin-block-start: var(--spacing-rhythm);
  }
}
</style>
