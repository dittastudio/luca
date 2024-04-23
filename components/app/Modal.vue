<script lang="ts" setup>
interface Props {
  isOpen?: boolean
}

const { isOpen = false } = defineProps<Props>()
</script>

<template>
  <div
    :class="[
      'app-modal',
      {
        'app-modal--is-open': isOpen,
      },
    ]"
  >
    <div class="app-modal__content">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.app-modal {
  pointer-events: none;

  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;

  overflow: auto;

  width: 100%;
  height: 100%;

  background-color: rgb(0 0 0 / 0%);

  transition: background-color theme('transitionDuration.500')
    theme('transitionTimingFunction.smooth');

  &.app-modal--is-open {
    pointer-events: auto;
    background-color: rgb(0 0 0 / 50%);
  }
}

.app-modal__content {
  transform: translate3d(0, 100vh, 0);
  width: 100%;
  background-color: white;
  transition: transform theme('transitionDuration.500') theme('transitionTimingFunction.smooth');

  .app-modal--is-open & {
    transform: translate3d(0, 0, 0);
    transition-delay: theme('transitionDelay.500');
  }
}
</style>
