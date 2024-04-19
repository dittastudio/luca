<script lang="ts" setup>
interface Props {
  isOpen: boolean
}

const { isOpen = false } = defineProps<Props>()
</script>

<template>
  <span data-component="UiAccordionSwitch" class="ui-accordion-switch"
    :class="{ 'ui-accordion-switch--is-open': isOpen }">
    <span class="ui-accordion-switch__inner"></span>
    <span class="sr-only">Toggle menu</span>
  </span>
</template>

<style lang="postcss" scoped>
.ui-accordion-switch {
  --size: theme('spacing.20');

  display: flex;
  align-items: center;
  width: var(--size);
  height: var(--size);
}

.ui-accordion-switch__inner {
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

  .ui-accordion-switch--is-open & {
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
