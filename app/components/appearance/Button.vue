<script lang="ts" setup>
interface Props {
  size?: 'default' | 'responsive'
}

const { size = 'default' } = defineProps<Props>()
</script>

<template>
  <span
    :class="[
      'appearance-button',
      'relative block isolate',
      'font-heading font-normal uppercase',
      'after:absolute after:-inset-(--button-border-width) after:z-0 after:bg-black/10',

      { [`appearance-button--${size}`]: size },
    ]"
  >
    <slot />
  </span>
</template>

<style>
@reference "@/assets/css/main.css";

.appearance-button {
  --button-padding-y: 1em;
  --button-padding-x: 2em;
  --button-font-size: var(--text-14);
  --button-text-color: var(--app-text-color);
  --button-background-color: transparent;
  --button-border-color: var(--app-text-color);
  --button-border-width: calc(2 / 14 * 1em);

  padding: var(--button-padding-y) var(--button-padding-x);
  border: var(--button-border-width) solid var(--button-border-color);

  font-family: theme('fontFamily.heading');
  font-size: var(--button-font-size);
  color: var(--button-text-color);
  text-indent: theme('letterSpacing.widest');
  letter-spacing: theme('letterSpacing.widest');
  background-color: var(--button-background-color);

  transition:
    background-color var(--app-element-speed) var(--ease-smooth),
    border-color var(--app-element-speed) var(--ease-smooth),
    color var(--app-element-speed) var(--ease-smooth);

  &--responsive {
    @variant max-md {
      --button-padding-y: 0.8em;
      --button-padding-x: 1em;
      --button-font-size: var(--text-12);
    }
  }

  @media (hover: hover) {
    a:hover &,
    button:not(:disabled):hover & {
      --button-text-color: var(--app-background-color);
      --button-background-color: var(--app-text-color);
      --button-border-color: var(--app-text-color);
    }
  }

  &::after {
    opacity: 0;
    transition: opacity 0.2s var(--ease-smooth);

    a:active &,
    button:not(:disabled):active & {
      opacity: 1;
    }
  }
}
</style>
