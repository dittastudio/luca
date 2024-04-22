<script lang="ts" setup>
import type { LinkListStoryblok } from '@/types/storyblok'

interface Props {
  list?: LinkListStoryblok
}

const { list } = defineProps<Props>()
const items = computed(() => list?.items ?? [])
</script>

<template>
  <div data-component="AppFooterNavigation" class="app-footer-info">
    <ul class="app-footer-info__list">
      <li class="app-footer-info__item">&copy;2024 All rights reserved</li>

      <li v-for="item in items" :key="item._uid" class="app-footer-info__item">
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
  overflow: hidden;
  font-size: theme('fontSize.12');
  color: theme('colors.white/50%');
  letter-spacing: theme('letterSpacing.wide');
}

.app-footer-info__list {
  display: flex;
  flex-direction: column;
  gap: theme('spacing.15');
  align-items: center;

  @screen sm {
    flex-flow: row wrap;
    gap: 0;
    align-items: flex-start;
    margin-left: -1.6ch;
  }
}

.app-footer-info__item {
  @screen sm {
    &::before {
      content: '/';
      margin-inline: 0.5ch;
    }
  }
}

.app-footer-info__link {
  @media (hover: hover) {
    transition: color theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

    &:hover {
      color: theme('colors.white/100%');
    }
  }
}
</style>
