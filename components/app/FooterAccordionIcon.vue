<script lang="ts" setup>
interface Props {
  isOpen: boolean
}

const { isOpen = false } = defineProps<Props>()
</script>

<template>
  <span
    class="app-footer-accordion-icon"
    :class="{ 'app-footer-accordion-icon--is-open': isOpen }"
  >
    <span class="app-footer-accordion-icon__inner" />

    <span class="sr-only">Toggle menu</span>
  </span>
</template>

<style lang="postcss" scoped>
.app-footer-accordion-icon {
  --size: theme('spacing.20');

  display: flex;
  align-items: center;
  width: var(--size);
  height: var(--size);
}

.app-footer-accordion-icon__inner {
  --burger-height: 1px;
  --burger-offset: 0;

  position: relative;
  display: block;
  width: 100%;
  height: var(--burger-height);

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

  &::after {
    rotate: 0.25turn;
    animation: rotate-close theme('transitionDuration.400') theme('transitionTimingFunction.smooth') forwards;
  }

  .app-footer-accordion-icon--is-open & {
    &::after {
      rotate: 0.5turn;
      animation: rotate-open theme('transitionDuration.300') theme('transitionTimingFunction.smooth') forwards;
    }
  }
}

@keyframes rotate-open {
  0% {
    rotate: 0.25turn;
  }

  100% {
    rotate: 0.5turn;
  }
}

@keyframes rotate-close {
  0% {
    rotate: 0.5turn;
  }

  99.9% {
    rotate: 0.75turn;
  }

  100% {
    rotate: 0.25turn;
  }
}
</style>
