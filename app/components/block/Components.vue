<script lang="ts" setup>
import type { Page } from '@@/.storyblok/types/285210/storyblok-components'

interface Props {
  content: Page
}

const { content } = defineProps<Props>()

const route = useRoute()
const isHome = computed(() => ['/', '/home'].includes(route.path))
const isStory = computed(() => route.path.startsWith('/stories/'))
</script>

<template>
  <div
    class="block-components"
    :class="{ 'block-components--home': isHome, 'block-components--story': isStory }"
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

      <BlockCardEditorial
        v-else-if="block.component === 'block_card_editorial'"
        :block="block"
      />

      <BlockCarousel
        v-else-if="block.component === 'block_carousel'"
        :block="block"
      />

      <BlockGallery
        v-else-if="block.component === 'block_gallery'"
        :block="block"
      />

      <BlockMedia
        v-else-if="block.component === 'block_media'"
        :block="block"
      />

      <BlockMenus
        v-else-if="block.component === 'block_menus'"
        :block="block"
      />

      <BlockPlayer
        v-else-if="block.component === 'block_player'"
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

      <BlockTextColumns
        v-else-if="block.component === 'block_text_columns'"
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

<style scoped>
@reference "@/assets/css/main.css";

.block-components__item {
  --line-spacing: --spacing(16);
  --first-spacing-rhythm: --spacing(6);
  --spacing-rhythm: --spacing(30);

  padding-block-start: var(--first-spacing-rhythm);

  @variant md {
    --first-spacing-rhythm: --spacing(20);
    --spacing-rhythm: 15.75vw;
  }

  @variant 3xl {
    --spacing-rhythm: --spacing(60);
  }

  .app-story .block-components--story & {
    --first-spacing-rhythm: var(--app-header-height);
  }

  & + & {
    padding-block-start: var(--spacing-rhythm);
  }

  &:not(.block-components__item--block_gallery):last-child {
    padding-block-end: --spacing(30);
  }

  .block-components--home &:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;

    min-height: 100vh;
    margin-block-start: calc(-1 * var(--app-header-height));
    padding-block: calc(var(--app-header-height) + --spacing(6));

    @variant md {
      height: 100vh;
      padding-block: 0;
    }
  }

  .block-components--home &:not(:first-child) {
    position: relative;
    z-index: var(--app-layer-two);
  }

  & .block-components__line,
  &:has(.block-components__line) + & {
    padding-block-start: var(--line-spacing);
  }
}

.block-components__item--block_text:first-child {
  @variant max-md {
    padding-block-start: 25vh;
  }
}

.block-components__item--block_gallery:first-child {
  padding-block-start: 0;
}

.block-components__item--block_text + .block-components__item--block_button {
  padding-block-start: var(--line-spacing);
}

.block-components__item--block_gallery + .block-components__item--block_text_columns {
  padding-block-start: var(--line-spacing);
}
</style>
