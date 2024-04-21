<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import IconLucaLogo from '@/assets/icons/luca-logo.svg'

const isActive = ref(false)
const section = ref(null)

useIntersectionObserver(
  section,
  ([{ isIntersecting }]) => {
    isActive.value = isIntersecting
  },
  { rootMargin: '-100% 0px -100% 0px', threshold: 0 },
)
</script>

<template>
  <div
    ref="section"
    data-component="HeroStickyLogo"
    class="hero-sticky-logo"
    :class="{ 'hero-sticky-logo--is-active': isActive }"
  >
    <div class="hero-sticky-logo__inner">
      <div class="hero-sticky-logo__panel">
        <IconLucaLogo class="hero-sticky-logo__icon" />
      </div>
    </div>

    <div class="hero-sticky-logo__content">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.hero-sticky-logo {
  pointer-events: none;
  position: relative;
  margin-block-start: calc(-1 * var(--app-header-height));
}

.hero-sticky-logo__inner {
  position: absolute;
  width: 100%;
  height: 100%;
}

.hero-sticky-logo__panel {
  position: sticky;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100vh;

  opacity: 0;

  transition: opacity theme('transitionDuration.500') theme('transitionTimingFunction.smooth');

  .hero-sticky-logo--is-active & {
    opacity: 1;
  }
}

.hero-sticky-logo__icon {
  width: 60vw;
  height: auto;

  @screen md {
    width: 23.646vw;
  }

  @screen 2xl {
    width: 454px;
  }
}

.hero-sticky-logo__content {
  pointer-events: auto;
}
</style>
