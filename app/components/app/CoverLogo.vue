<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import IconLucaLogo from '@/assets/icons/luca-logo.svg'

const isHidden = ref(false)
const main = ref<HTMLElement | null>(null)

onMounted(() => {
  main.value = document.querySelector('main')

  if (!main.value) {
    return
  }

  useIntersectionObserver(
    main,
    ([target]) => {
      if (!target) {
        return
      }

      isHidden.value = !target.isIntersecting
    },
    { rootMargin: '-100% 0px 0px 0px', threshold: 0 },
  )
})
</script>

<template>
  <div
    class="cover-logo"
    :class="{ 'cover-logo--is-hidden': isHidden }"
  >
    <IconLucaLogo class="cover-logo__icon" />
  </div>
</template>

<style lang="postcss" scoped>
.cover-logo {
  pointer-events: none;

  position: sticky;
  z-index: var(--app-layer-one);
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  height: 100dvh;
  margin-block-start: calc(-1 * 100vh);
  margin-block-start: calc(-1 * 100dvh);

  color: theme('colors.white');

  opacity: 1;

  transition: opacity theme('transitionDuration.300') theme('transitionTimingFunction.smooth');

  &--is-hidden {
    opacity: 0;
  }

  @screen mdMax {
    display: none;
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
}
</style>
