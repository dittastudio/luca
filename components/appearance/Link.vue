<template>
  <span class="appearance-link">
    <slot />
  </span>
</template>

<style lang="postcss">
.appearance-link {
  --link-padding-x: theme('spacing.10');
  --link-padding-y: theme('spacing.10');

  isolation: isolate;

  display: block;

  margin: calc(-1 * var(--link-padding-y)) calc(-1 * var(--link-padding-x));
  padding: var(--link-padding-y) var(--link-padding-x);

  font-family: theme('fontFamily.heading');
  font-size: theme('fontSize.10');
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
</style>
