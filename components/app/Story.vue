<script lang="ts" setup>
interface Props {
  isOpen?: boolean
}

const { isOpen = false } = defineProps<Props>()
const closeStoryLink = ref('/')

watch(() => isOpen, (value) => {
  closeStoryLink.value = value ? window.history.state.back : '/'
})
</script>

<template>
  <div :class="['app-story', { 'app-story--is-open': isOpen }]">
    <div class="app-story__content">
      <div class="app-story__bar wrapper">
        <NuxtLink
          :to="closeStoryLink"
          class="app-story__link"
        >
          <span class="app-story__close">
            <span class="app-story__cross" />
          </span>

          <span class="sr-only">Close</span>
        </NuxtLink>
      </div>

      <slot />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.app-story {
  pointer-events: none;

  isolation: isolate;
  position: fixed;
  z-index: theme('zIndex.20');
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;
  height: 100dvh;

  background-color: rgb(0 0 0 / 0%);

  transition: background-color theme('transitionDuration.500') theme('transitionTimingFunction.smooth');

  &.app-story--is-open {
    pointer-events: auto;
    background-color: rgb(0 0 0 / 50%);
    transition: background-color theme('transitionDuration.1000') theme('transitionTimingFunction.smooth');
  }

  :global(html:has(&.app-story--is-open)) {
    overflow: hidden;
  }
}

.app-story__content {
  translate: 0 100vh 0;
  translate: 0 100dvh 0;

  overflow-y: auto;
  overscroll-behavior: contain;

  width: 100%;
  height: inherit;

  color: theme('colors.green');

  background-color: theme('colors.offwhite');

  transition: translate theme('transitionDuration.500') theme('transitionTimingFunction.smooth');

  .app-story--is-open & {
    translate: 0 0 0;
    transition: translate theme('transitionDuration.700') theme('transitionTimingFunction.inOutExpo') theme('transitionDelay.500');
  }

  :deep(.page-cover) {
    color: theme('colors.green');
    background-color: theme('colors.offwhite');
  }
}

.app-story__bar {
  pointer-events: none;

  position: sticky;
  z-index: 1;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 100%;
  height: var(--app-header-height);
  margin-top: calc(-1 * var(--app-header-height));
  padding-block:var(--app-header-padding-y);

  @screen md {
    align-items: flex-start;
    padding-block: calc(var(--app-header-padding-y) - 4px);
  }
}

.app-story__link {
  pointer-events: auto;
  display: block;
  margin: calc(-1 * theme('spacing.20'));
  padding: theme('spacing.20');

  @media (hover: hover) {
    opacity: 1;
    transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

    &:not(:active):hover {
      opacity: 0.6;
    }
  }
}

.app-story__close {
  --close-size: theme('spacing.32');

  @screen md {
    --close-size: theme('spacing.40');
  }

  display: flex;
  align-items: center;

  width: var(--close-size);
  height: var(--close-size);

  border-radius: 50%;
}

.app-story__cross {
  --cross-height: 1px;

  position: relative;
  display: block;
  width: 100%;
  height: var(--cross-height);

  &::before,
  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: currentcolor;
  }

  &::before {
    rotate: 45deg;
  }

  &::after {
    rotate: -45deg;
  }
}
</style>
