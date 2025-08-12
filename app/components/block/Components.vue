<script lang="ts" setup>
import type { Page } from '@@/.storyblok/types/285210/storyblok-components'
import IconLucaLogo from '@/assets/icons/luca-logo.svg'

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
      v-for="(block, index) in content.blocks"
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

      <div
        v-if="block.component === 'block_media' && isHome && index === 0"
        class="block-components__logo"
      >
        <IconLucaLogo class="block-components__logo-svg" />
      </div>

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

<style lang="postcss">
.block-components__item {
  --line-spacing: theme('spacing.80');
  --first-spacing-rhythm: theme('spacing.30');
  --spacing-rhythm: theme('spacing.150');

  padding-block-start: var(--first-spacing-rhythm);

  @screen md {
    --first-spacing-rhythm: theme('spacing.100');
    --spacing-rhythm: 15.75vw;
  }

  @screen 3xl {
    --spacing-rhythm: theme('spacing.300');
  }

  .app-story .block-components--story & {
    --first-spacing-rhythm: var(--app-header-height);
  }

  &--block_text:first-child {
    @media screen(mdMax) {
      padding-block-start: 25vh;
    }
  }

  &--block_gallery:first-child {
    padding-block-start: 0;
  }

  & + & {
    padding-block-start: var(--spacing-rhythm);
  }

  &:not(&--block_gallery):last-child {
    padding-block-end: theme('spacing.150');
  }

  .block-components--home &:first-child {
    position: relative;
    margin-block-start: theme('spacing.30');
    padding-block-start: 0;

    @screen md {
      display: flex;
      flex-direction: column;
      justify-content: center;

      height: 100vh;
      margin-block-start: calc(-1 * var(--app-header-height));
      padding-block-start: 0;
    }
  }

  .block-components--home &:not(:first-child) {
    position: relative;
    z-index: var(--app-layer-two);
  }

  &:has(.block-components__line) + & {
    padding-block-start: var(--line-spacing);
  }

  & .block-components__line  {
    padding-block-start: var(--line-spacing);
  }

  /* Bespoke recipes */
  &--block_text + &--block_button {
    padding-block-start: var(--line-spacing);
  }

  &--block_gallery + &--block_text_columns {
    padding-block-start: var(--line-spacing);
  }
}

.block-components__logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @screen md {
    display: none;
  }
}

.block-components__logo-svg {
  display: block;
  width: 50vw;
}
</style>
