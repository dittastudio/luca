<script lang="ts" setup>
interface Props {
  type: 'green' | 'offwhite' | 'white'
}

const { type = 'green' } = defineProps<Props>()
</script>


<template>
  <span class="button-appearance type-body-large" :class="`button-appearance--type-${type}`">
    <span class="button-appearance__text">
      <slot />
    </span>
  </span>
</template>

<style lang="postcss">
.button-appearance {
  --button-padding-block: 11px;
  --button-background-color: transparent;
  --button-text-color: theme('colors.white');
  --button-border-color: theme('colors.white');

  isolation: isolate;
  position: relative;

  display: block;

  padding: var(--button-padding-block) theme('spacing.40');

  color: var(--button-text-color);

  background-color: var(--button-background-color);
  border-radius: theme('borderRadius.sm');

  transition:
    background-color theme('transitionDuration.200') theme('transitionTimingFunction.smooth'),
    color theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

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

      &.button-appearance--type-offwhite {
        --button-background-color: theme('colors.green');
        --button-text-color: theme('colors.offwhite');
        --button-border-color: theme('colors.green');
      }

      &.button-appearance--type-white {
        --button-background-color: theme('colors.green');
        --button-text-color: theme('colors.white');
        --button-border-color: theme('colors.green');
      }
    }
  }
}


.button-appearance__text {
  position: relative;
  z-index: 1;
}
</style>
