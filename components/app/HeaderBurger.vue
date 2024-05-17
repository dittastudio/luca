<script lang="ts" setup>
interface Props {
  isOpen: boolean
}

const { isOpen = false } = defineProps<Props>()
</script>

<template>
  <span
    class="app-header-burger"
    :class="{ 'app-header-burger--is-open': isOpen }"
  >
    <span class="app-header-burger__inner" />

    <span class="sr-only">Toggle menu</span>
  </span>
</template>

<style lang="postcss" scoped>
.app-header-burger {
  --size: theme('spacing.32');

  display: flex;
  align-items: center;
  width: var(--size);
  height: var(--size);
}

.app-header-burger__inner {
  --burger-height: 1px;
  --burger-offset: 5px;

  position: relative;
  display: block;
  width: 100%;
  height: var(--burger-height);

  &::before,
  &::after {
    --trans-out-open: theme('transitionDuration.350') theme('transitionTimingFunction.outExpo') theme('transitionDelay.350');
    --trans-in-open: theme('transitionDuration.350') theme('transitionTimingFunction.inExpo');
    --trans-out-close: theme('transitionDuration.250') theme('transitionTimingFunction.outExpo') theme('transitionDelay.250');
    --trans-in-close: theme('transitionDuration.250') theme('transitionTimingFunction.inExpo');

    content: '';

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: currentcolor;

    transition:
      translate var(--trans-out-close),
      rotate var(--trans-in-close);
  }

  &::before {
    translate: 0 calc(-1 * var(--burger-offset)) 0;
  }

  &::after {
    translate: 0 var(--burger-offset) 0;
  }

  .app-header-burger--is-open & {
    &::before,
    &::after {
      transition: translate var(--trans-in-open), rotate var(--trans-out-open);
    }

    &::before {
      translate: 0 0 0;
      rotate: 45deg;
    }

    &::after {
      translate: 0 0 0;
      rotate: -45deg;
    }
  }
}
</style>
