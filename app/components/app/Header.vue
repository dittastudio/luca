<script lang="ts" setup>
import type { LinkList } from '@@/.storyblok/types/285210/storyblok-components'
import IconLucaLogo from '@/assets/icons/luca-logo.svg'
import IconMichelin from '@/assets/icons/michelin.svg'

interface Props {
  links?: LinkList
  logoHidden?: boolean
  reservationHidden?: boolean
}

const { links, logoHidden, reservationHidden } = defineProps<Props>()

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
  }
  // Scrolling down
  else {
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

const reservationsOpen = useState<boolean>('reservationsOpen')
const navigationOpen = useState<boolean>('navigationOpen')

const headerClasses = computed<Record<string, boolean>>(() => ({
  'app-header--is-open': navigationOpen.value,
  'app-header--has-scrolled': hasScrolled.value,
  'app-header--has-scrolled-up': hasScrolledUp.value,
  'app-header--has-scrolled-down': hasScrolledDown.value,
  'app-header--logo-hidden': logoHidden,
  'app-header--reservation-hidden': reservationHidden,
}))

const closeNavigation = () => {
  navigationOpen.value = false
}

const toggleNavigation = () => {
  navigationOpen.value = !navigationOpen.value
}

const reservationsForce = ref<boolean>(false)
</script>

<template>
  <div
    class="app-header"
    :class="headerClasses"
    @keyup.esc="closeNavigation"
  >
    <button
      tabindex="-1"
      class="app-header__bg"
      type="button"
      @click="closeNavigation"
    >
      <span class="sr-only">Close Menu</span>
    </button>

    <div class="app-header__wrapper wrapper">
      <div class="app-header__menu">
        <button
          class="app-header__switch"
          type="button"
          @click="toggleNavigation"
        >
          <span class="app-header__burger">
            <AppHeaderBurger :is-open="navigationOpen" />
          </span>

          <span class="app-header__switch-text type-body-large">Menu</span>
        </button>

        <span class="app-header__line" />

        <nav class="app-header__navigation">
          <AppHeaderNavigation
            :is-open="navigationOpen"
            :list="links"
          />
        </nav>
      </div>

      <div class="app-header__logo">
        <NuxtLink
          to="/"
          class="app-header__logo-link"
        >
          <IconLucaLogo class="app-header__logo-icon" />

          <span class="sr-only">Luca</span>
        </NuxtLink>
      </div>

      <div class="app-header__details">
        <IconMichelin class="app-header__michelin-icon" />

        <button
          class="app-header__reservations"
          type="button"
          @focus="reservationsForce = true"
          @mouseenter="reservationsForce = true"
          @click="reservationsOpen = true"
        >
          <AppearanceButton size="responsive">
            <span class="md:hidden">Book</span>

            <span class="mdMax:hidden">Reservations</span>
          </AppearanceButton>
        </button>

        <AppModal
          :is-open="reservationsOpen"
          :force="reservationsForce"
          @close="() => reservationsOpen = false"
        >
          <iframe
            src="https://www.sevenrooms.com/reservations/luca"
            width="100%"
            height="700"
            frameborder="0"
          />
        </AppModal>
      </div>
    </div>

    <svg
      class="app-header__background"
      width="100%"
      height="100%"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="app-header__gradient"
          x1="0"
          x2="0"
          y1="0"
          y2="1"
        >
          <stop
            class="app-header__gradient--colour-1"
            offset="0%"
          />

          <stop
            class="app-header__gradient--colour-2"
            offset="100%"
          />
        </linearGradient>
      </defs>

      <rect
        class="app-header__gradient"
        x="0"
        y="0"
        rx="0"
        ry="0"
        width="100%"
        height="100%"
      />
    </svg>
  </div>
</template>

<style lang="postcss">
.app-header {
  isolation: isolate;
  position: relative;
  height: var(--app-header-height);
  transition: color var(--app-header-speed) theme('transitionTimingFunction.smooth');

  html:has(&.app-header--is-open) {
    overflow: hidden;
  }

  &--is-open {
    color: theme('colors.white');

    .appearance-button {
      --button-color: theme('colors.white');
      --button-hover-color: theme('colors.green');
    }
  }
}

.app-header__background {
  pointer-events: none;
  position: absolute;
  z-index: -1;
  inset: 0;
}

.app-header__gradient {
  translate: 0 -100% 0;
  opacity: 0;
  fill: url("#app-header__gradient");
  transition:
    opacity theme('transitionDuration.400') theme('transitionTimingFunction.in'),
    translate theme('transitionDuration.400') theme('transitionTimingFunction.in');

  .app-header--has-scrolled:not(.app-header--is-open, .app-header--reservation-hidden) & {
    translate: 0 0 0;
    opacity: 1;
    transition:
      opacity theme('transitionDuration.400') theme('transitionTimingFunction.out'),
      translate theme('transitionDuration.400') theme('transitionTimingFunction.out');
  }
}

.app-header__gradient--colour-1,
.app-header__gradient--colour-2 {
  transition: stop-color var(--app-background-speed) var(--app-background-ease);
}

.app-header__gradient--colour-1 {
  stop-color: var(--app-background-color);
}

.app-header__gradient--colour-2 {
  stop-color: var(--app-background-color);
  stop-opacity: 0;
}

.app-header__bg {
  position: absolute;

  width: 100%;
  height: 100vh;

  opacity: 0;
  background-color: var(--app-header-background-tint);
  backdrop-filter: var(--app-header-blur);

  transition: opacity theme('transitionDuration.1000') theme('transitionTimingFunction.smooth');

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
  padding-block: var(--app-header-padding-y);

  @screen md {
    align-items: flex-start;
  }
}

.app-header__menu {
  @screen md {
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

  @media (hover: hover) {
    opacity: 1;
    transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

    &:not(:active):hover {
      opacity: 0.6;
    }
  }
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
  background-color: currentcolor;

  transition:
    scale theme('transitionDuration.200') theme('transitionTimingFunction.smooth'),
    opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  .app-header--is-open & {
    scale: 1 1 1;
    opacity: 1;
    transition:
      scale theme('transitionDuration.800') theme('transitionTimingFunction.smooth'),
      opacity theme('transitionDuration.800') theme('transitionTimingFunction.smooth');
  }

  @screen mdMax {
    display: none;
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
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  padding-block: var(--app-header-padding-y);

  @screen md {
    align-items: flex-start;
  }
}

.app-header__logo-link {
  pointer-events: auto;

  translate: 0 0 0;

  display: block;

  opacity: 1;

  transition:
    opacity theme('transitionDuration.500') theme('transitionTimingFunction.smooth'),
    translate 0s 0s;

  .app-header--has-scrolled-up & {
    pointer-events: auto;
    translate: 0 0 0;
    opacity: 1;
  }

  .app-header--has-scrolled-down &,
  .app-header--logo-hidden & {
    pointer-events: none;
    translate: 0 -15% 0;
    opacity: 0;
    transition:
      opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth'),
      translate theme('transitionDuration.200') theme('transitionTimingFunction.smooth');
  }

  @screen lgMax {
    .app-header--is-open & {
      pointer-events: none;
      opacity: 0;
      transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');
    }
  }
}

.app-header__logo-icon {
  width: 113px;
  height: 47px;

  @screen lg {
    width: 180px;
    height: 74px;
  }
}

.app-header__details {
  pointer-events: auto;

  display: flex;
  gap: theme('spacing.30');
  align-items: center;

  transition: opacity theme('transitionDuration.500') theme('transitionTimingFunction.smooth');

  .app-header--reservation-hidden & {
    pointer-events: none;
    opacity: 0;
    transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');
  }
}

.app-header__michelin-icon {
  width: 20px;
  height: 23px;

  @screen mdMax {
    display: none;
  }
}

.app-header__reservations {
  @screen mdMax {
    transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');
  }

  .app-header--is-open & {
    @screen mdMax {
      opacity: 0;
    }
  }
}
</style>
