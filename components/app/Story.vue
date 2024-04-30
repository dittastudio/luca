<script lang="ts" setup>
interface Props {
  isOpen?: boolean
}

const { isOpen = false } = defineProps<Props>()
</script>

<template>
  <div :class="['app-story', { 'app-story--is-open': isOpen }]">
    <div class="app-story__content">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.app-story {
  pointer-events: none;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  overflow: auto;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background-color: rgb(0 0 0 / 0%);
  transition: background-color theme('transitionDuration.500')
    theme('transitionTimingFunction.smooth');

  &.app-story--is-open {
    pointer-events: auto;
    background-color: rgb(0 0 0 / 50%);
  }

  :global(html:has(&.app-story--is-open)) {
    overflow: hidden;
  }
}

.app-story__content {
  transform: translate3d(0, 100vh, 0);
  overflow: hidden auto;
  overscroll-behavior: contain;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  color: theme('colors.green');
  background-color: theme('colors.offwhite');
  transition: transform theme('transitionDuration.500') theme('transitionTimingFunction.smooth');

  .app-story--is-open & {
    transform: translate3d(0, 0, 0);
    transition-delay: theme('transitionDelay.500');
  }

  :deep(.page-cover) {
    color: theme('colors.green');
    background-color: theme('colors.offwhite');
  }
}
</style>
