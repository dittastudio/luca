<template>
  <div class="app-layout">
    <header class="app-layout__header">
      <slot name="header" />
    </header>

    <main class="app-layout__main">
      <slot name="main" />
    </main>

    <footer class="app-layout__footer">
      <slot name="footer" />
    </footer>

    <slot name="modal" />
  </div>
</template>

<style lang="postcss" scoped>
.app-layout {
  isolation: isolate;

  display: flex;
  flex-direction: column;

  /* svh doesn't work on Kate's phone, lol. Fallback. */
  min-height: 100vh;
  min-height: 100svh;
}

.app-layout__header {
  pointer-events: none;
  position: sticky;
  z-index: theme('zIndex.10');
  top: 0;
}

.app-layout__main {
  flex-grow: 1;

  .app-layout__header + & {
    margin-top: 25vh;

    @screen md {
      margin-top: theme('spacing.120');
    }
  }
}

.app-layout__footer {
  margin-block-start: theme('spacing.120');

  @screen md {
    margin-block-start: theme('spacing.300');
  }
}
</style>
