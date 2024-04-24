<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import IconLucaLogo from '@/assets/icons/luca-logo.svg'

const isVisible = ref(false)
const section = ref<HTMLElement | null>(null)

onMounted(() => {
  section.value = document.querySelector('main')

  useIntersectionObserver(
    section,
    ([{ isIntersecting }]) => {
      isVisible.value = isIntersecting
    },
    { rootMargin: '-100% 0px -100% 0px', threshold: 0 },
  )
})
</script>

<template>
  <div
    class="cover-logo"
    :class="{ 'cover-logo--is-active': isVisible }"
  >
    <IconLucaLogo class="cover-logo__icon" />
  </div>
</template>

<style lang="postcss" scoped>
.cover-logo {
  --logo-container-height: 100vh;

  pointer-events: none;

  position: sticky;
  z-index: var(--app-layer-deep);
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  height: var(--logo-container-height);
  margin-block-start: calc(-1 * var(--logo-container-height));

  opacity: 0;

  transition: opacity theme('transitionDuration.300') theme('transitionTimingFunction.smooth');

  &--is-active {
    opacity: 1;
  }
}

.cover-logo__icon {
  --logo-responsive-width: 60vw;

  @screen md {
    --logo-responsive-width: 31.55vw;
  }

  @screen 2xl {
    --logo-responsive-width: 454px;
  }

  width: var(--logo-responsive-width);
  height: auto;

  @screen mdMax {
    display: none;
  }
}
</style>
