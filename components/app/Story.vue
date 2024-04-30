<script lang="ts" setup>
import IconClose from '@/assets/icons/close.svg'

interface Props {
  isOpen?: boolean
}

const { isOpen = false } = defineProps<Props>()
const closeStoryLink = ref('/')

onMounted(() => {
  closeStoryLink.value = window.history.state.back
})
</script>

<template>
  <div :class="['app-story', { 'app-story--is-open': isOpen }]">
    <div class="app-story__content">
      <div class="app-story__wrapper">
        <p class="app-story__close">
          <NuxtLink
            :to="closeStoryLink"
            class="app-story__close-link"
          >
            <IconClose class="app-story__close-icon" />

            <span class="sr-only">Close</span>
          </NuxtLink>
        </p>

        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.app-story {
  pointer-events: none;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  overflow: auto;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background-color: rgb(0 0 0 / 0%);
  transition: background-color theme('transitionDuration.500')
    theme('transitionTimingFunction.smooth');

  &.app-story--is-open {
    pointer-events: auto;
    background-color: rgb(0 0 0 / 50%);
  }

  :global(html:has(&.app-story--is-open)) {
    overflow: hidden;
  }
}

.app-story__content {
  transform: translate3d(0, 100vh, 0);
  overflow: hidden auto;
  overscroll-behavior: contain;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  color: theme('colors.green');
  background-color: theme('colors.offwhite');
  transition: transform theme('transitionDuration.500') theme('transitionTimingFunction.smooth');

  .app-story--is-open & {
    transform: translate3d(0, 0, 0);
    transition-delay: theme('transitionDelay.500');
  }

  :deep(.page-cover) {
    color: theme('colors.green');
    background-color: theme('colors.offwhite');
  }
}

.app-story__wrapper {
  position: relative;
}

.app-story__close {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.app-story__close-link {
  pointer-events: auto;
  display: block;
  position: sticky;
  top: var(--app-outer-gutter);
  right: var(--app-outer-gutter);
  z-index: 1;
  width: 20px;
  height: 20px;
  margin: 0 0 0 auto;

  @screen md {
    width: 46px;
    height: 46px;
  }
}

.app-story__close-icon {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
