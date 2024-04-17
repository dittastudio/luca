<script lang="ts" setup>
import IconLucaLogo from '@/assets/icons/luca-logo.svg'

const isOpen = ref<boolean>(false)
const prevScrollPos = ref<number>(0)
const hasScrolled = ref<boolean>(false)
const hasScrolledUp = ref<boolean>(false)
const hasScrolledDown = ref<boolean>(false)
const raf = ref<any>(null)

const handleScroll = () => {
  const triggerPoint = 50

  const scrollPos = window.scrollY

  hasScrolled.value = scrollPos > triggerPoint

  // Scrolling up
  if (prevScrollPos.value > scrollPos) {
    hasScrolledUp.value = scrollPos > triggerPoint
    hasScrolledDown.value = false

    // Scrolling down
  } else {
    hasScrolledUp.value = false
    hasScrolledDown.value = scrollPos > triggerPoint
  }

  prevScrollPos.value = scrollPos

  raf.value = null
}

const rAFHeaderScroll = () => {
  if (!raf.value) {
    raf.value = requestAnimationFrame(handleScroll)
  }
}

onMounted(() => {
  rAFHeaderScroll()
  window.addEventListener('scroll', rAFHeaderScroll)
})

const headerClasses = computed<any>(() => ({
  'app-header--has-scrolled': hasScrolled.value,
  'app-header--has-scrolled-up': hasScrolledUp.value,
  'app-header--has-scrolled-down': hasScrolledDown.value,
}))

const toggleBurger = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="app-header wrapper" :class="headerClasses">
    <button class="app-header__switch" type="button" @click="toggleBurger">
      <AppHeaderBurger :is-open="isOpen" />
    </button>

    <div class="app-header__middle">
      <IconLucaLogo class="app-header__logo" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.app-header {
  isolation: isolate;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  padding-block: theme('spacing.24');

  &--has-scrolled-up {
    translate: 0 0 0;
    transition: translate theme('transitionDuration.500') theme('transitionTimingFunction.inOutExpo');
  }

  &--has-scrolled-down {
    translate: 0 -100% 0;
    transition: translate theme('transitionDuration.200') theme('transitionTimingFunction.inQuart');
  }
}

.app-header__switch {
  position: relative;
  z-index: 1;
  margin: calc(-1 * var(--app-outer-gutter));
  padding: var(--app-outer-gutter);
}

.app-header__middle {
  display: flex;
  flex: 1;
  justify-content: center;
}

.app-header__logo {
  width: 113px;
  height: 47px;

  @screen md {
    width: 180px;
    height: 74px;
  }
}
</style>
