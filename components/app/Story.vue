<script lang="ts" setup>
interface Props {
  isOpen?: boolean
}

const { isOpen = false } = defineProps<Props>()
</script>

<template>
  <div
    :class="[
      'app-story',
      {
        'app-story--is-open': isOpen,
      },
    ]"
  >
    <div class="app-story__content">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.app-story {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  scroll-behavior: contain;
  background-color: rgb(0 0 0 / 0%);
  transition: background-color theme('transitionDuration.500')
    theme('transitionTimingFunction.smooth');

  &.app-story--is-open {
    pointer-events: auto;
    background-color: rgb(0 0 0 / 50%);
  }
}

.app-story__content {
  transform: translate3d(0, 100vh, 0);
  width: 100%;
  min-height: 100%;
  background-color: white;
  transition: transform theme('transitionDuration.500') theme('transitionTimingFunction.smooth');

  .app-story--is-open & {
    transform: translate3d(0, 0, 0);
    transition-delay: theme('transitionDelay.500');
  }
}
</style>