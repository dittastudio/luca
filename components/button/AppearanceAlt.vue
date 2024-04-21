<script lang="ts" setup>
interface Props {
  type: 'green' | 'offwhite' | 'white'
}

const { type = 'green' } = defineProps<Props>()
</script>

<template>
  <span
    data-component="ButtonAppearanceAlt"
    class="button-appearance-alt"
    :class="`button-appearance-alt--type-${type}`"
  >
    <span class="button-appearance-alt__text">
      <slot />
    </span>
  </span>
</template>

<style lang="postcss">
.button-appearance-alt {
  --button-padding-y: 1.25em;
  --button-padding-x: 2.2em;
  --button-background-color: transparent;
  --button-text-color: theme('colors.white');
  --button-border-color: theme('colors.white');

  isolation: isolate;
  position: relative;

  display: block;

  padding: var(--button-padding-y) var(--button-padding-x);

  font-family: theme('fontFamily.heading');
  font-size: theme('fontSize.10');
  font-weight: normal;
  color: var(--button-text-color);
  text-indent: theme('letterSpacing.widest');
  text-transform: uppercase;
  letter-spacing: theme('letterSpacing.widest');

  background-color: var(--button-background-color);
  border-radius: theme('borderRadius.sm');

  transition: background-color theme('transitionDuration.200') theme('transitionTimingFunction.smooth'),
    color theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  @screen md {
    font-size: theme('fontSize.12');
  }

  &::before {
    content: '';

    position: absolute;
    inset: 0;

    border: 1px solid var(--button-border-color);
    border-radius: inherit;
  }

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

  &--type-offwhite,
  &--type-white {
    --button-background-color: transparent;
    --button-text-color: theme('colors.green');
    --button-border-color: theme('colors.green');
  }

  a:active &::after,
  button:not(:disabled):active &::after {
    opacity: 1;
  }

  @media (hover: hover) {

    a:hover &,
    button:not(:disabled):hover & {
      --button-background-color: theme('colors.white');
      --button-text-color: theme('colors.green');
      --button-border-color: theme('colors.white');

      &.button-appearance-alt--type-offwhite {
        --button-background-color: theme('colors.green');
        --button-text-color: theme('colors.offwhite');
        --button-border-color: theme('colors.green');
      }

      &.button-appearance-alt--type-white {
        --button-background-color: theme('colors.green');
        --button-text-color: theme('colors.white');
        --button-border-color: theme('colors.green');
      }
    }
  }
}

.button-appearance-alt__text {
  position: relative;
  z-index: 1;
  top: 0.1em;
}
</style>
