<script lang="ts" setup>
import type { LinkListStoryblok } from '@/types/storyblok'

interface Props {
  items: LinkListStoryblok[]
}

const { items } = defineProps<Props>()
</script>

<template>
  <div data-component="AppFooterInfo" class="app-footer-info">
    <ul class="app-footer-info__list">
      <li class="app-footer-info__item">©2024 All rights reserved</li>

      <li v-for="item in items" class="app-footer-info__item">
        <StoryblokLink class="app-footer-info__link" active-class="app-header-navigation__link--is-active"
          :item="item.link" :title="item.title">
          {{ item.title }}
        </StoryblokLink>
      </li>

      <li class="app-footer-info__item">
        <NuxtLink class="app-footer-info__link" to="https://e-i-b.com/" target="_blank" rel="noopener noreferrer"><!--
        -->Design: Everything In Between
        </NuxtLink>
      </li>

      <li class="app-footer-info__item">
        <NuxtLink class="app-footer-info__link" to="https://ditta.studio/" target="_blank" rel="noopener noreferrer"><!--
        -->made by ditta</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
.app-footer-info {
  overflow: hidden;
  font-size: theme('fontSize.14');
  letter-spacing: theme('letterSpacing.wide');

  @screen sm {
    font-size: theme('fontSize.12');
  }
}

.app-footer-info__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -0.8em;

  @screen sm {
    flex-flow: row wrap;
    align-items: flex-start;
  }
}

.app-footer-info__item {
  @screen sm {
    &::before {
      content: '/';
      margin-inline: 0.25em;
    }
  }
}

.app-footer-info__link {
  @media (hover: hover) {
    transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
