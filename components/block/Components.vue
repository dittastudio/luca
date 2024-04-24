<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

interface Props {
  content: PageStoryblok
}

const { content } = defineProps<Props>()

const route = useRoute()

const isHome = computed(() => route.path === '/')
</script>

<template>
  <div
    class="block-components"
    :class="{ 'block-component--home': isHome }"
  >
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
  --spacing-rhythm: theme('spacing.150');

  @screen md {
  --spacing-rhythm: 15.75vw;
  }

  @screen 3xl {
    --spacing-rhythm: theme('spacing.300');
  }

  & + & {
    margin-block-start: var(--spacing-rhythm);
  }

  .block-component--home &:first-child {
    position: relative;
    z-index: var(--app-layer-deeper);
    margin-block-start: theme('spacing.30');

    @screen md {
      display: flex;
      flex-direction: column;
      justify-content: center;

      height: 100vh;
      margin-block-start: calc(-1 * var(--app-header-height));
    }
  }
}

.block-components__item--block_card {
  & + & {
    margin-block-start: var(--spacing-rhythm);
  }
}
</style>
