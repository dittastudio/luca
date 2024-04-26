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
  z-index: 1;
  flex-grow: 1;
  min-height: 100vh;
}

.app-layout__footer {
  .app-layout__main + & {
    margin-block-start: theme('spacing.150');
  }
}
</style>
