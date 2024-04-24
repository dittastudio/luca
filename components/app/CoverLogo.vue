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
  pointer-events: none;
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  opacity: 0;
  transition: opacity theme('transitionDuration.300') theme('transitionTimingFunction.smooth');

  &--is-active {
    opacity: 1;
  }
}

.cover-logo__icon {
  width: 60vw;
  height: auto;

  @screen md {
    width: 23.646vw;
  }

  @screen 2xl {
    width: 454px;
  }
}
</style>
