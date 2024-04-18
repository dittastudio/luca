<script lang="ts" setup>
import IconLucaLogo from '@/assets/icons/luca-logo.svg'
import IconMichelin from '@/assets/icons/michelin.svg'

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

onUnmounted(() => {
  cancelAnimationFrame(raf.value)
  window.removeEventListener('scroll', rAFHeaderScroll)
})

const headerClasses = computed<Record<string, boolean>>(() => ({
  'app-header--has-scrolled': hasScrolled.value,
  'app-header--has-scrolled-up': hasScrolledUp.value,
  'app-header--has-scrolled-down': hasScrolledDown.value,
}))

const toggleBurger = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div data-component="AppHeader" class="app-header" :class="headerClasses">
    <div class="app-header__wrapper wrapper">
      <button class="app-header__switch" type="button" @click="toggleBurger">
        <span class="app-header__burger">
          <AppHeaderBurger :is-open="isOpen" />
        </span>

        <span class="app-header__switch-text type-body-large">Menu</span>
      </button>

      <div class="app-header__logo">
        <IconLucaLogo class="app-header__logo-icon" />
      </div>

      <div class="app-header__details">
        <IconMichelin class="app-header__michelin-icon" />

        <button type="button">
          <ButtonAppearance type="green">Reservations</ButtonAppearance>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.app-header {
  isolation: isolate;
  height: var(--app-header-height);
  background-image: linear-gradient(
    to bottom,
    theme('colors.green/100%'),
    theme('colors.green/0%')
  );
}

.app-header__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 100%;
  padding-block: theme('spacing.24');
}

.app-header__switch {
  position: relative;
  z-index: 1;
  margin: calc(-1 * var(--app-outer-gutter));
  padding: var(--app-outer-gutter);
}

.app-header__burger {
  @screen md {
    display: none;
  }
}

.app-header__switch-text {
  @screen mdMax {
    display: none;
  }
}

.app-header__logo {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  .app-header--has-scrolled-up & {
    translate: 0 0 0;
    opacity: 1;
    transition:
      opacity theme('transitionDuration.500') theme('transitionTimingFunction.smooth'),
      translate 0s 0s;
  }

  .app-header--has-scrolled-down & {
    translate: 0 -15% 0;
    opacity: 0;
    transition:
      opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth'),
      translate theme('transitionDuration.200') theme('transitionTimingFunction.smooth');
  }
}

.app-header__logo-icon {
  width: 113px;
  height: 47px;

  @screen md {
    width: 180px;
    height: 74px;
  }
}

.app-header__details {
  display: flex;
  gap: theme('spacing.30');
  align-items: center;

  @screen mdMax {
    display: none;
  }
}

.app-header__michelin-icon {
  width: 34px;
  height: 39px;
}
</style>
