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
  <div data-component="AppHeaderNavigation" class="app-header-navigation"
    :class="{ 'app-header-navigation--is-open': isOpen }">
    <div class="app-header-navigation__inner">

      <ul class="app-header-navigation__list type-h2">
        <li v-for="(item, index) in items" class="app-header-navigation__item"
          :style="`--link-transition-delay: ${200 + index * 40}ms`">
          <StoryblokLink class="app-header-navigation__link" :item="item.link">
            {{ item.title }}
          </StoryblokLink>
        </li>
      </ul>
    </div>

    <button class="app-header-navigation__cta" type="button">
      <ButtonAppearance type="green">Reservations</ButtonAppearance>
    </button>
  </div>
</template>

<style lang="postcss" scoped>
.app-header-navigation {
  @screen mdMax {
    display: flex;
    flex-direction: column;
    gap: theme('spacing.40');
    align-items: center;

    min-height: 100%;
    padding-block: var(--app-header-height) theme('spacing.40');

    text-align: center;
  }
}

.app-header-navigation__inner {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;

  @screen mdMax {
    width: 100%;
  }
}

.app-header-navigation__list {
  --link-nudge: 8px;
  --link-padding-x: theme('spacing.10');
  --link-padding-y: theme('spacing.10');

  @screen md {
    --link-padding-x: theme('spacing.10');
    --link-padding-y: 3px;
  }

  font-size: theme('fontSize.24');

  @screen md {
    margin-block: calc(-1 * var(--link-padding-y));
    margin-inline: calc(-1 * var(--link-padding-x));
    font-size: theme('fontSize.20');
  }
}

@keyframes link-show {
  0% {
    translate: calc(-1 * var(--link-nudge)) 0 0;
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
  translate: calc(-1 * var(--link-nudge)) 0 0;
  opacity: 0;
  animation: link-hide theme('transitionDuration.200') theme('transitionTimingFunction.smooth') forwards;

  .app-header-navigation--is-open & {
    animation: link-show theme('transitionDuration.300') theme('transitionTimingFunction.smooth') var(--link-transition-delay) forwards;
  }
}

.app-header-navigation__link {
  display: block;

  width: 100%;
  padding-block: var(--link-padding-y);
  padding-inline: var(--link-padding-x);

  transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  &:hover {
    font-style: italic;
  }

  .app-header-navigation__list:hover &:not(:hover) {
    opacity: 0.5;
  }
}

.app-header-navigation__cta {
  @screen md {
    display: none;
  }
}
</style>
