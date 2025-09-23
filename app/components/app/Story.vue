<script lang="ts" setup>
interface Props {
  isOpen?: boolean
}

const { isOpen = false } = defineProps<Props>()

const onEsc = () => {
  if (isOpen)
    navigateTo('/stories')
}

let handleKeyUp: ((e: KeyboardEvent) => void) | null = null

onMounted(() => {
  handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      onEsc()
    }
  }
  window.addEventListener('keyup', handleKeyUp)
})

onBeforeUnmount(() => {
  if (handleKeyUp) {
    window.removeEventListener('keyup', handleKeyUp)
  }
})
</script>

<template>
  <div
    class="app-story"
    :class="[{ 'app-story--is-open': isOpen }]"
  >
    <div class="app-story__content">
      <div class="app-story__bar wrapper">
        <NuxtLink
          to="/stories"
          class="app-story__link"
        >
          <span class="app-story__close">
            <span class="app-story__cross" />
          </span>

          <span class="sr-only">Close</span>
        </NuxtLink>
      </div>

      <slot />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.app-story {
  pointer-events: none;

  isolation: isolate;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;
  height: 100dvh;

  background-color: --alpha(var(--color-black) / 0%);

  transition: background-color 0.5s var(--ease-smooth);

  &.app-story--is-open {
    pointer-events: auto;
    background-color: --alpha(var(--color-black) / 50%);
    transition: background-color 1s var(--ease-smooth);
  }

  :global(html:has(&.app-story--is-open)) {
    overflow: hidden;
  }
}

.app-story__content {
  translate: 0 100vh 0;
  translate: 0 100dvh 0;

  overflow-y: auto;
  overscroll-behavior: contain;

  width: 100%;
  height: inherit;

  color: var(--color-green);

  opacity: 0;
  background-color: var(--color-offwhite);

  transition:
    translate 0.5s var(--ease-smooth),
    opacity 0s 0.5s;

  .app-story--is-open & {
    translate: 0 0 0;
    opacity: 1;
    transition: translate 1s var(--ease-inOutExpo) 0.5s;
  }

  :deep(.page-cover) {
    color: var(--color-green);
    background-color: var(--color-offwhite);
  }
}

.app-story__bar {
  pointer-events: none;

  position: sticky;
  z-index: 1;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 100%;
  height: var(--app-header-height);
  margin-top: calc(-1 * var(--app-header-height));
  padding-block:var(--app-header-padding-y);

  @variant md {
    align-items: flex-start;
    padding-block: calc(var(--app-header-padding-y) - 4px);
  }
}

.app-story__link {
  pointer-events: auto;
  display: block;
  margin: --spacing(-4);
  padding: --spacing(4);

  @media (hover: hover) {
    opacity: 1;
    transition: opacity 0.2s var(--ease-smooth);

    &:not(:active):hover {
      opacity: 0.6;
    }
  }
}

.app-story__close {
  --close-size: 32px;

  @variant md {
    --close-size: --spacing(8);
  }

  display: flex;
  align-items: center;

  width: var(--close-size);
  height: var(--close-size);

  border-radius: 50%;
}

.app-story__cross {
  --cross-height: 1px;

  position: relative;
  display: block;
  width: 100%;
  height: var(--cross-height);

  &::before,
  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: currentcolor;
  }

  &::before {
    rotate: 45deg;
  }

  &::after {
    rotate: -45deg;
  }
}
</style>
