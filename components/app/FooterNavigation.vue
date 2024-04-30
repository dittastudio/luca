<script lang="ts" setup>
import type { LinkListStoryblok } from '@/types/storyblok'

interface Props {
  list?: LinkListStoryblok
}

const { list } = defineProps<Props>()
const items = computed(() => list?.items ?? [])
</script>

<template>
  <div class="app-footer-info">
    <ul class="app-footer-info__list">
      <li class="app-footer-info__item">
        <span class="app-footer-info__text">
          &copy;2024 All rights reserved
        </span>
      </li>

      <li
        v-for="item in items"
        :key="item._uid"
        class="app-footer-info__item"
      >
        <StoryblokLink
          class="app-footer-info__link"
          active-class="app-header-navigation__link--is-active"
          :item="item.link"
          :title="item.title"
        >
          {{ item.title }}
        </StoryblokLink>
      </li>

      <li class="app-footer-info__item">
        <NuxtLink
          class="app-footer-info__link"
          to="https://e-i-b.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Design: Everything In Between
        </NuxtLink>
      </li>

      <li class="app-footer-info__item">
        <NuxtLink
          class="app-footer-info__link"
          to="https://ditta.studio"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by ditta
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
.app-footer-info {
  font-size: theme('fontSize.12');
  letter-spacing: theme('letterSpacing.wide');
}

.app-footer-info__list {
  display: flex;
  flex-direction: column;
  align-items: center;

  @screen sm {
    flex-flow: row wrap;
    align-items: flex-start;
    margin-block-end: -0.3em;
  }
}

.app-footer-info__item {
  @screen sm {
    &:not(:first-child)::before {
      content: '/';
      opacity: 0.5;
    }
  }
}

.app-footer-info__text,
.app-footer-info__link {
  --link-padding-x: theme('spacing.5');
  --link-padding-y: theme('spacing.10');

  @screen sm {
    --link-padding-y: theme('spacing.20');
  }

  display: inline-block;
  padding: var(--link-padding-y) var(--link-padding-x);
  opacity: 0.5;

  @screen sm {
    margin-block: calc(-1 * var(--link-padding-y));
  }
}

.app-footer-info__link {
  @media (hover: hover) {
    transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

    &:hover {
      opacity: 1;
    }
  }
}
</style>
