<script lang="ts" setup>
import type { LinkListStoryblok } from '@/types/storyblok'

interface Props {
  isOpen: boolean
  list?: LinkListStoryblok
}

const { list } = defineProps<Props>()
const items = computed(() => list?.items ?? [])
</script>

<template>
  <nav data-component="AppHeaderNavigation" class="app-header-navigation"
    :class="{ 'app-header-navigation--is-open': isOpen }">
    <ul class="app-header-navigation__list type-h2">
      <li v-for="item in items">
        <StoryblokLink class="app-header-navigation__link" :item="item.link">
          {{ item.title }}
        </StoryblokLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="postcss" scoped>
.app-header-navigation {
  pointer-events: none;

  position: absolute;
  z-index: -1;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;
  height: 100dvh;

  text-align: center;

  opacity: 0;
  background-color: theme('colors.green');

  transition: opacity theme('transitionDuration.500') theme('transitionTimingFunction.smooth');

  &--is-open {
    pointer-events: auto;
    opacity: 1;
  }

  @screen md {
    position: static;

    display: block;

    width: auto;
    height: auto;

    text-align: left;

    background-color: transparent;
  }
}

.app-header-navigation__list {
  --link-padding: theme('spacing.10');

  @screen md {
    --link-padding: theme('spacing.6');
  }

  margin: calc(-1 * var(--link-padding));

  @screen md {
    font-size: theme('fontSize.20');
  }
}

.app-header-navigation__link {
  display: block;
  padding: var(--link-padding);
}
</style>
