<script lang="ts" setup>
interface Props {
  size?: 'default' | 'responsive'
}

const { size = 'default' } = defineProps<Props>()
</script>

<template>
  <span
    class="appearance-button"
    :class="{ [`appearance-button--${size}`]: size }"
  >
    <span class="appearance-button__text">
      <slot />
    </span>
  </span>
</template>

<style lang="postcss">
.appearance-button {
  --button-padding-y: 1.25em;
  --button-padding-x: 2.2em;
  --button-font-size: theme('fontSize.12');
  --button-color: var(--app-text-color);
  --button-hover-color: var(--app-background-color);

  isolation: isolate;
  position: relative;

  display: block;

  padding: var(--button-padding-y) var(--button-padding-x);

  font-family: theme('fontFamily.heading');
  font-size: var(--button-font-size);
  font-weight: normal;
  color: var(--button-color);
  text-indent: theme('letterSpacing.widest');
  text-transform: uppercase;
  letter-spacing: theme('letterSpacing.widest');

  background-color: transparent;
  border: 1px solid var(--button-color);
  border-radius: theme('borderRadius.sm');

  transition:
    background-color var(--app-element-speed) theme('transitionTimingFunction.smooth'),
    border-color var(--app-element-speed) theme('transitionTimingFunction.smooth'),
    color var(--app-element-speed) theme('transitionTimingFunction.smooth');

  &::after {
    content: '';

    position: absolute;
    z-index: 0;
    inset: 0;

    opacity: 0;
    background-color: theme('colors.black/10%');
    border-radius: inherit;

    transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');
  }

  &--responsive {
    @screen mdMax {
      --button-padding-y: 1em;
      --button-padding-x: 1em;
      --button-font-size: theme('fontSize.10');
    }
  }

  a:active &::after,
  button:not(:disabled):active &::after {
    opacity: 1;
  }

  @media (hover: hover) {
    a:hover &,
    button:not(:disabled):hover & {
      color: var(--button-hover-color);
      background-color: var(--button-color);
      border-color: var(--button-color);
    }
  }
}

.appearance-button__text {
  position: relative;
  z-index: 1;
  top: 0.075em;
}
</style>
