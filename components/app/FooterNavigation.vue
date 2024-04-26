<script lang="ts" setup>
import type { LinkListStoryblok } from '@/types/storyblok'

interface Props {
  list?: LinkListStoryblok
}

const { list } = defineProps<Props>()
const items = computed(() => list?.items ?? [])

const hover: any = ref(null)
const hoverInner: any = ref(null)

const animateMe = (event: any) => {
  const { offsetX: x, offsetY: y } = event
  const { offsetWidth: width, offsetHeight: height } = hover.value.$el
  const move = 5
  const xMove = x / width * (move * 2) - move
  const yMove = y / height * (move * 2) - move

  hoverInner.value.style.translate = `${xMove}px ${yMove}px 0`

  if (event.type === 'mouseleave') hoverInner.value.style.translate = '0 0 0'
}
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

      <li
        class="app-footer-info__item"
      >
        <NuxtLink
          ref="hover"
          class="app-footer-info__link"
          to="https://ditta.studio"
          target="_blank"
          rel="noopener noreferrer"
          @mousemove="animateMe"
          @mouseleave="animateMe"
        >
          <span
            ref="hoverInner"
            class="app-footer-info__credit"
          >
            Made by ditta
          </span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
.app-footer-info {
  font-size: theme('fontSize.12');
  color: theme('colors.white/50%');
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
    }
  }
}

.app-footer-info__text,
.app-footer-info__link {
  --link-padding-x: theme('spacing.5');
  --link-padding-y: theme('spacing.10');

  display: inline-block;
  padding: var(--link-padding-y) var(--link-padding-x);

  @screen sm {
    margin-block: calc(-1 * var(--link-padding-y));
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

.app-footer-info__credit {
  pointer-events: none;
  display: inline-block;
  transition: translate theme('transitionDuration.300') theme('transitionTimingFunction.outBack');
}
</style>
