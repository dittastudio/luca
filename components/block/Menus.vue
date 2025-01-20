<script lang="ts" setup>
import type { BlockMenusStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockMenusStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="block-menus wrapper"
  >
    <nav class="block-menus__nav">
      <ul class="block-menus__list type-body-large">
        <li
          v-for="(menu, index) in block.menus"
          :key="menu._uid"
          class="block-menus__item"
        >
          <NuxtLink
            class="block-menus__link"
            :to="menu.pdf.filename"
            target="_blank"
          >
            <AppearanceButton>
              {{ menu.title }}
            </AppearanceButton>
          </NuxtLink>

          <UiConnection v-if="index < (block.menus?.length ?? 0) - 1" />
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="postcss" scoped>
.block-menus {
  text-align: center;
  backface-visibility: hidden;

  @media screen(md) {
    margin-top: calc(40vh - var(--app-header-height));
  }
}

.block-menus__list {
  display: flex;
  flex-direction: column;
}

.block-menus__item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.block-menus__link {
  padding: theme('spacing.80');
}
</style>
