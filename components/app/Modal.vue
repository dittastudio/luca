<script lang="ts" setup>
interface Props {
  isOpen?: boolean
}

const { isOpen = false } = defineProps<Props>()
</script>

<template>
  <div
    data-component="AppModal"
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000;
  overflow: auto;
  pointer-events: none;
  transition: background-color theme('transitionDuration.500')
    theme('transitionTimingFunction.smooth');

  &.app-modal--is-open {
    pointer-events: auto;
    background-color: rgba(0, 0, 0, 0.5);
  }
}

.app-modal__content {
  width: 100%;
  transform: translate3d(0, 100vh, 0);
  background-color: white;
  transition: transform theme('transitionDuration.500') theme('transitionTimingFunction.smooth');

  .app-modal--is-open & {
    transition-delay: theme('transitionDelay.500');
    transform: translate3d(0, 50vh, 0);
  }
}
</style>
