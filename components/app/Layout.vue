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

    <slot name="dev" />
  </div>
</template>

<style lang="postcss" scoped>
.app-layout {
  isolation: isolate;
  display: flex;
  flex-direction: column;
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
}
</style>
