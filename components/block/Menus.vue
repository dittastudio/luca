<script lang="ts" setup>
import type { BlockMenusStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockMenusStoryblok
}

const { block } = defineProps<Props>()

const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="block"
    class="block-menus wrapper"
  >
    <div
      v-if="block.media && assetType === 'image'"
      class="block-menus__banner"
    >
      <MediaImage
        class="block-menus__media col-start-2 col-end-12"
        :asset="block.media"
        ratio="5:2"
        :sizes="`
          100vw
          sm:100vw
          md:${10 / 12 * 100}vw
          3xl:${10 / 12 * 1800}px
        `"
      />
    </div>

    <nav class="block-menus__nav">
      <ul class="block-menus__list type-body-large">
        <li
          v-for="menu in block.menus"
          :key="menu._uid"
          class="block-menus__item"
        >
          <NuxtLink
            class="block-menus__link"
            :to="menu.pdf.filename"
            target="_blank"
          >
            {{ menu.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="postcss" scoped>
.block-menus {
  display: flex;
  flex-direction: column;
  gap: theme('spacing.60');

  margin-block-start: theme('spacing.30');

  backface-visibility: hidden;

  @media screen(md) {
    gap: theme('spacing.80');
    margin-block-start: calc(theme('spacing.50') * -1);
  }
}

.block-menus__banner {
  @screen md {
    display: grid;
    grid-template-columns: var(--app-grid);
    gap: var(--app-inner-gutter);
  }
}

.block-menus__media {
  border-radius: theme('borderRadius.sm');
}

.block-menus__list {
  display: flex;
  flex-direction: column;
}

.block-menus__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.block-menus__link {
  --link-padding-x: theme('spacing.10');
  --link-padding-y: theme('spacing.10');

  width: 100%;
  padding: var(--link-padding-y) var(--link-padding-x);
  transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  &:hover {
    font-style: italic;
  }

  .block-menus__list:hover &:not(:hover) {
    opacity: 0.5;
  }

  @media screen(md) {
    --link-padding-y: 3px;
  }
}
</style>
