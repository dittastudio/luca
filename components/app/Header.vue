<script lang="ts" setup>
import type { LinkListStoryblok } from '@/types/storyblok'

import IconLucaLogo from '@/assets/icons/luca-logo.svg'
import IconMichelin from '@/assets/icons/michelin.svg'

interface Props {
  links: LinkListStoryblok
}

const { links } = defineProps<Props>()

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
  'app-header--is-open': isOpen.value,
  'app-header--has-scrolled': hasScrolled.value,
  'app-header--has-scrolled-up': hasScrolledUp.value,
  'app-header--has-scrolled-down': hasScrolledDown.value,
}))

const closeMenu = () => {
  isOpen.value = false
}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div @keydown.esc="closeMenu" data-component="AppHeader" class="app-header" :class="headerClasses">
    <button class="app-header__bg" type="button" @click="closeMenu"></button>

    <div class="app-header__wrapper wrapper">
      <div class="app-header__menu">
        <button class="app-header__switch" type="button" @click="toggleMenu">
          <span class="app-header__burger">
            <AppHeaderBurger :is-open="isOpen" />
          </span>

          <span class="app-header__switch-text type-body-large">Menu</span>
        </button>

        <span class="app-header__line"></span>

        <nav class="app-header__navigation">
          <AppHeaderNavigation :is-open="isOpen" :list="links" />
        </nav>
      </div>

      <div class="app-header__logo">
        <NuxtLink to="/">
          <IconLucaLogo class="app-header__logo-icon" />
        </NuxtLink>
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

<style lang="postcss">
.app-header {
  isolation: isolate;
  position: relative;
  height: var(--app-header-height);
  background-image: linear-gradient(to bottom,
      theme('colors.green/100%'),
      theme('colors.green/0%'));


  html:has(&.app-header--is-open) {
    overflow: hidden;
  }
}

.app-header__bg {
  pointer-events: none;

  position: absolute;

  width: 100%;
  height: 100vh;

  opacity: 0;
  background-color: theme('colors.green/90%');
  backdrop-filter: blur(8px);

  transition: opacity theme('transitionDuration.500') theme('transitionTimingFunction.smooth');

  .app-header--is-open & {
    pointer-events: auto;
    opacity: 1;
  }

  @screen mdMax {
    display: none;
  }
}

.app-header__wrapper {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 100%;
  padding-block: theme('spacing.20');

  @screen md {
    align-items: flex-start;
    padding-block-start: theme('spacing.50');
  }
}

.app-header__menu {
  @screen md {
    pointer-events: none;

    position: relative;
    z-index: 1;

    display: flex;
    gap: theme('spacing.10');
    align-items: flex-start;
  }
}

.app-header__switch {
  pointer-events: auto;

  position: relative;
  z-index: 1;

  margin: calc(-1 * theme('spacing.20'));
  padding: theme('spacing.20');
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

.app-header__line {
  --line-width: 77px;
  --line-alignment-nudge: 14px;

  transform-origin: left;
  scale: 0 1 1;

  width: var(--line-width);
  height: 1px;
  margin-block: var(--line-alignment-nudge);

  opacity: 0;
  background-color: theme('colors.white');

  transition:
    scale theme('transitionDuration.200') theme('transitionTimingFunction.smooth'),
    opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  .app-header--is-open & {
    scale: 1 1 1;
    opacity: 1;
    transition:
      scale theme('transitionDuration.300') theme('transitionTimingFunction.smooth') theme('transitionDelay.100'),
      opacity theme('transitionDuration.300') theme('transitionTimingFunction.smooth') theme('transitionDelay.100');
  }
}

.app-header__navigation {
  pointer-events: none;

  .app-header--is-open & {
    pointer-events: auto;
  }

  @screen mdMax {
    position: absolute;
    z-index: -1;
    inset: 0;

    overflow-y: auto;

    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;

    opacity: 0;
    background-color: theme('colors.green');

    transition: opacity theme('transitionDuration.500') theme('transitionTimingFunction.smooth');

    .app-header--is-open & {
      opacity: 1;
    }
  }

  @screen md {
    position: relative;
    z-index: 2;
  }
}

.app-header__logo {
  pointer-events: none;

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
  pointer-events: auto;
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