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
  --_spacing: --spacing(30);

  padding-block-start: var(--_spacing);
}

.block-components__item:first-child {
  --_spacing: --spacing(6);

  &.block-components__item--block_text {
    --_spacing: --spacing(15);

    @variant md {
      --_spacing: --spacing(30);
    }
  }
}

.block-components__item .block-components__line,
.block-components__item:has(.block-components__line) + .block-components__item {
  padding-block-start: --spacing(16);
}

.block-components__item--block_text + .block-components__item--block_button,
.block-components__item--block_gallery + .block-components__item--block_text_columns {
  --_spacing: --spacing(16);
}

.block-components__item--block_card,
.block-components__item--block_card_editorial {
  & + & {
    --_spacing: --spacing(30);

    @variant md {
      --_spacing: 15.75vw;
    }

    @variant 3xl {
      --_spacing: --spacing(60);
    }
  }
}

.block-components--home .block-components__item:first-child {
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-block-start: calc(-1 * var(--app-header-height));
  padding-block-start: calc(var(--app-header-height) + --spacing(6));

  @variant md {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    margin-block-start: calc(-1 * var(--app-header-height));
    padding-block: 0;
  }
}

.block-components--home .block-components__item:not(:first-child) {
  position: relative;
  z-index: var(--app-layer-two);
}

.block-components__item:last-child {
  padding-block-end: --spacing(24);

  @variant md {
    padding-block-end: --spacing(30);
  }
}

.block-components--story {
  & .block-components__item:first-child {
    --_spacing: var(--app-header-height);
  }

  & .block-components__item--block_gallery:first-child {
    --_spacing: 0;
  }

  & .block-components__item--block_gallery:last-child {
    padding-block-end: 0;
  }
}
</style>
