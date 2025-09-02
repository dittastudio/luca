<template>
  <div class="isolate flex flex-col">
    <header class="sticky top-0 z-10 pointer-events-none">
      <slot name="header" />
    </header>

    <main class="z-1 flex-grow">
      <slot name="main" />
    </main>

    <footer class="app-layout__footer">
      <slot name="footer" />
    </footer>

    <slot name="dev" />
  </div>
</template>
