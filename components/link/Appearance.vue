<template>
  <span data-component="ButtonAppearance" class="link-appearance type-body-large">
    <slot />
  </span>
</template>

<style lang="postcss">
.link-appearance {
  --link-padding: theme('spacing.20');

  isolation: isolate;

  display: block;

  margin: calc(-1 * var(--link-padding));
  padding: var(--link-padding);

  font-family: theme('fontFamily.heading');
  font-size: 10px;
  font-weight: normal;
  text-indent: theme('letterSpacing.widest');
  text-transform: uppercase;
  letter-spacing: theme('letterSpacing.widest');

  transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  a:hover &,
  button:not(:disabled):hover & {
    opacity: 0.6;
  }

  a:active &,
  button:not(:disabled):active & {
    opacity: 0.8;
  }
}

.link-appearance__text {
  position: relative;
  z-index: 1;
}
</style>
