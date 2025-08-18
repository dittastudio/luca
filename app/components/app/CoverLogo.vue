<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import IconLucaLogo from '@/assets/icons/luca-logo.svg'

const isHidden = ref(false)
const main = ref<HTMLElement | null>(null)

const isLogoPassed = useState('isLogoPassed', () => false)
const logoRef = ref<HTMLElement>()

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

useIntersectionObserver(
  logoRef,
  ([target]) => {
    if (!target) {
      return
    }

    isLogoPassed.value = target.isIntersecting
  },
  {
    threshold: 0,
    rootMargin: '0px',
  },
)
</script>

<template>
  <div
    class="cover-logo"
    :class="{ 'cover-logo--is-hidden': isHidden }"
  >
    <div ref="logoRef">
      <IconLucaLogo class="cover-logo__icon" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.cover-logo {
  pointer-events: none;

  position: absolute;
  z-index: var(--app-layer-one);
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;
  height: 100dvh;

  color: theme('colors.white');

  opacity: 1;
  filter: drop-shadow(0 0 15px rgb(0 0 0 / 50%));

  transition: opacity theme('transitionDuration.300') theme('transitionTimingFunction.smooth');

  &--is-hidden {
    opacity: 0;
  }

  @screen md {
    position: sticky;
    margin-block-start: calc(-1 * 100vh);
    margin-block-start: calc(-1 * 100dvh);
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
