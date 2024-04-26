<script lang="ts" setup>
import type { LinkListStoryblok } from '@/types/storyblok'

interface Props {
  isOpen: boolean
  list?: LinkListStoryblok
}

const isInteracted = ref(false)
const { isOpen, list } = defineProps<Props>()
const items = computed(() => list?.items ?? [])

watch(
  () => isOpen,
  () => isInteracted.value = true,
)
</script>

<template>
  <div
    class="app-header-navigation"
    :class="{
      'app-header-navigation--is-open': isOpen && isInteracted,
      'app-header-navigation--is-closed': !isOpen && isInteracted,
    }"
  >
    <div class="app-header-navigation__inner">
      <ul class="app-header-navigation__list type-h2">
        <li
          v-for="(item, index) in items"
          :key="item._uid"
          class="app-header-navigation__item"
          :style="`--link-transition-delay: ${200 + index * 40}ms`"
        >
          <StoryblokLink
            class="app-header-navigation__link"
            active-class="app-header-navigation__link--is-active"
            :item="item.link"
            :title="item.title"
            :tabindex="isOpen ? '0' : '-1'"
          >
            {{ item.title }}
          </StoryblokLink>
        </li>
      </ul>
    </div>

    <button
      class="app-header-navigation__cta"
      type="button"
      :tabindex="isOpen ? '0' : '-1'"
    >
      <AppearanceButton type="green">
        Reservations
      </AppearanceButton>
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

  .app-header-navigation--is-closed & {
    animation: link-hide theme('transitionDuration.200') theme('transitionTimingFunction.smooth')
      forwards;
  }

  .app-header-navigation--is-open & {
    animation: link-show theme('transitionDuration.300') theme('transitionTimingFunction.smooth')
      var(--link-transition-delay) forwards;
  }
}

.app-header-navigation__link {
  user-select: none;

  position: relative;

  display: block;

  width: 100%;
  padding-block: var(--link-padding-y);
  padding-inline: var(--link-padding-x);

  transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  /* HACK: Added to stop hover stutter with italics 🤪 */
  &::after {
    pointer-events: none;
    content: attr(title);

    overflow: hidden;
    display: block;

    height: 0;

    font-style: normal;

    visibility: hidden;
    opacity: 0;
  }

  &:is(:hover, :focus-visible),
  .app-header-navigation__list:not(:hover) &.app-header-navigation__link--is-active {
    font-style: italic;
  }

  .app-header-navigation__list:focus-within &:not(:hover, :focus, :focus-visible),
  .app-header-navigation__list:hover &:not(:hover) {
    opacity: 0.5;
  }
}

.app-header-navigation__cta {
  translate: 0 50% 0;
  display: block;
  opacity: 0;
  transition:
    opacity theme('transitionDuration.100') theme('transitionTimingFunction.smooth'),
    translate 0s theme('transitionDelay.100');

  .app-header-navigation--is-open & {
    translate: 0 0 0;
    opacity: 1;
    transition:
      opacity theme('transitionDuration.200') theme('transitionTimingFunction.inOutExpo')
        theme('transitionDelay.400'),
      translate theme('transitionDuration.200') theme('transitionTimingFunction.inOutExpo')
        theme('transitionDelay.400');
  }

  @screen md {
    display: none;
  }
}
</style>
