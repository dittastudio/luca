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
      <li v-for="(item, index) in items" class="app-header-navigation__item"
        :style="`--link-transition-delay: ${(200 + (index * 40))}ms`">
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

  /* opacity: 0;
  transition: opacity 0s 0.5s; */

  &--is-open {
    pointer-events: auto;

    /* opacity: 1;
    transition: opacity 0s 0s; */
  }

  @screen mdMax {
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
      opacity: 1;
    }
  }

  @screen md {
    position: relative;
    z-index: 2;
  }
}

.app-header-navigation__list {
  --link-padding: theme('spacing.10');

  @screen md {
    --link-padding: 3px;
  }

  margin: calc(-1 * var(--link-padding));

  @screen md {
    font-size: theme('fontSize.20');
  }
}

@keyframes link-show {
  0% {
    translate: -8px 0 0;
    opacity: 0;
  }

  100% {
    translate: 0 0 0;
    opacity: 1;
  }
}

@keyframes link-hide {
  0% {
    translate: 0 0 0;
    opacity: 1;
  }

  100% {
    translate: 0 0 0;
    opacity: 0;
  }
}

.app-header-navigation__item {
  translate: -8px 0 0;
  opacity: 0;
  animation: link-hide theme('transitionDuration.200') theme('transitionTimingFunction.smooth') forwards;


  .app-header-navigation--is-open & {
    animation: link-show theme('transitionDuration.300') theme('transitionTimingFunction.smooth') var(--link-transition-delay) forwards;
  }
}

.app-header-navigation__link {
  display: block;
  padding: var(--link-padding);
  transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  &:hover {
    font-style: italic;
  }

  .app-header-navigation__list:hover &:not(:hover) {
    opacity: 0.5;
  }
}
</style>
