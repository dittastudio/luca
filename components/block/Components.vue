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
    :class="{ 'block-components--home': isHome }"
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

      <BlockCarousel
        v-else-if="block.component === 'block_carousel'"
        :block="block"
      />

      <BlockMedia
        v-else-if="block.component === 'block_media'"
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

      <BlockMenus
        v-else-if="block.component === 'block_menus'"
        :block="block"
      />

      <div
        v-if="block.connecting_line"
        class="block-components__line"
      >
        <UiConnection />
      </div>
    </section>
  </div>
</template>

<style lang="postcss">
.block-components__item {
  --line-spacing: theme('spacing.80');
  --spacing-rhythm: theme('spacing.150');
  --first-spacing-rhythm: 25vh;

  @screen md {
  --spacing-rhythm: 15.75vw;
  --first-spacing-rhythm: theme('spacing.100');
  }

  @screen 3xl {
    --spacing-rhythm: theme('spacing.300');
  }

  & + & {
    margin-block-start: var(--spacing-rhythm);
  }

  &:first-child {
    margin-block-start: var(--first-spacing-rhythm);
  }

  .block-components--home &:first-child {
    margin-block-start: theme('spacing.30');

    @screen md {
      display: flex;
      flex-direction: column;
      justify-content: center;

      height: 100vh;
      margin-block-start: calc(-1 * var(--app-header-height));
    }
  }

  .block-components--home &:not(:first-child) {
    position: relative;
    z-index: var(--app-layer-two);
  }

  &:has(.block-components__line) + & {
    margin-block-start: var(--line-spacing);
  }

  & .block-components__line  {
    margin-block-start: var(--line-spacing);
  }

  &--block_text + &--block_button {
    margin-block-start: var(--line-spacing);
  }

  &--block_menus:first-child {
    @screen md {
      margin-block-start: theme('spacing.20');
    }
  }
}
</style>
