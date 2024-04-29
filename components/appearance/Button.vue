<template>
  <span
    class="button-appearance"
  >
    <span class="button-appearance__text">
      <slot />
    </span>
  </span>
</template>

<style lang="postcss">
.button-appearance {
  --button-padding-y: 1.25em;
  --button-padding-x: 2.2em;

  isolation: isolate;
  position: relative;

  display: block;

  padding: var(--button-padding-y) var(--button-padding-x);

  font-family: theme('fontFamily.heading');
  font-size: theme('fontSize.12');
  font-weight: normal;
  color: var(--app-text-color);
  text-indent: theme('letterSpacing.widest');
  text-transform: uppercase;
  letter-spacing: theme('letterSpacing.widest');

  background-color: transparent;
  border: 1px solid var(--app-text-color);
  border-radius: theme('borderRadius.sm');

  transition:
    background-color theme('transitionDuration.200') theme('transitionTimingFunction.smooth'),
    border-color theme('transitionDuration.200') theme('transitionTimingFunction.smooth'),
    color theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

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

  a:active &::after,
  button:not(:disabled):active &::after {
    opacity: 1;
  }

  @media (hover: hover) {
    a:hover &,
    button:not(:disabled):hover & {
      color: var(--app-background-color);
      background-color: var(--app-text-color);
      border-color: var(--app-text-color);
    }
  }
}

.button-appearance__text {
  position: relative;
  z-index: 1;
  top: 0.1em;
}
</style>
