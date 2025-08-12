<script lang="ts" setup>
import type { Link, LinkGroup } from '@@/.storyblok/types/285210/storyblok-components'
import IconLucaLogo from '@/assets/icons/luca-logo.svg'
import IconMichelin from '@/assets/icons/michelin.svg'

interface Props {
  items?: (Link | LinkGroup)[]
  logoHidden?: boolean
  reservationHidden?: boolean
}

const { items = [], logoHidden, reservationHidden } = defineProps<Props>()

const prevScrollPos = ref<number>(0)
const hasScrolled = ref<boolean>(false)
const hasScrolledUp = ref<boolean>(false)
const hasScrolledDown = ref<boolean>(false)
const hasScrolledPastLogo = ref<boolean>(false)
const raf = ref<any>(null)

const handleScroll = () => {
  const triggerPoint = 50
  const scrollPos = window.scrollY
  const halfViewportHeight = window.innerHeight / 2

  hasScrolled.value = scrollPos > triggerPoint
  hasScrolledPastLogo.value = scrollPos > halfViewportHeight

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

const reservationsOpen = useState<boolean>('reservationsOpen')
const navigationOpen = useState<boolean>('navigationOpen')
const dropdownOpen = useState<string | null>('dropdownOpen')

const route = useRoute()
const isHome = computed(() => ['/', '/home'].includes(route.path))

const headerClasses = computed<Record<string, boolean>>(() => ({
  'app-header--is-open': navigationOpen.value,
  'app-header--is-dropdown-open': dropdownOpen.value !== null,
  'app-header--has-scrolled': hasScrolled.value,
  'app-header--has-scrolled-up': hasScrolledUp.value,
  'app-header--has-scrolled-down': hasScrolledDown.value,
  'app-header--has-scrolled-past-viewport': isHome.value && !hasScrolledPastLogo.value,
  'app-header--logo-hidden': logoHidden,
  'app-header--reservation-hidden': reservationHidden,
}))

const toggleNavigation = () => {
  navigationOpen.value = !navigationOpen.value

  if (!navigationOpen.value) {
    dropdownOpen.value = null
  }
}

const reservationsForce = ref<boolean>(false)

const setDropdownOpen = (dropdownId: string | null) => {
  dropdownOpen.value = dropdownId
}

const closeAllDropdowns = () => {
  dropdownOpen.value = null
}

const closeAllMenus = () => {
  navigationOpen.value = false
  dropdownOpen.value = null
}

onMounted(() => {
  rAFHeaderScroll()
  window.addEventListener('scroll', rAFHeaderScroll)
})

onUnmounted(() => {
  cancelAnimationFrame(raf.value)
  window.removeEventListener('scroll', rAFHeaderScroll)
})
</script>

<template>
  <div
    class="app-header"
    :class="headerClasses"
    @keyup.esc="closeAllMenus"
  >
    <button
      tabindex="-1"
      class="app-header__bg app-header__bg--mobile"
      type="button"
      @click="closeAllDropdowns"
    >
      <span class="sr-only">Close Menu</span>
    </button>

    <button
      tabindex="-1"
      class="app-header__bg app-header__bg--desktop"
      type="button"
      @click="closeAllDropdowns"
    >
      <span class="sr-only">Close Dropdown</span>
    </button>

    <div class="app-header__wrapper wrapper">
      <button
        class="app-header__switch"
        type="button"
        @click="toggleNavigation"
      >
        <span class="app-header__burger">
          <AppHeaderBurger :is-open="navigationOpen" />
        </span>
      </button>

      <div class="app-header__menu">
        <nav class="app-header__navigation type-body-large">
          <div class="app-header__list">
            <template
              v-for="item in items"
              :key="item._uid"
            >
              <StoryblokLink
                v-if="isLink(item)"
                class="app-header__item app-header__item--link"
                :item="item.link"
                :title="item.title"
              >
                {{ item.title }}
              </StoryblokLink>

              <template v-else-if="isLinkGroup(item)">
                <div
                  class="app-header__item"
                  :class="{ 'app-header__item--is-open': dropdownOpen === item._uid }"
                >
                  <AppHeaderDropdown
                    :title="item.title"
                    :items="item.links"
                    :is-open="dropdownOpen === item._uid"
                    :disable-on-mobile="item.hidden_on_mobile"
                    @toggle="setDropdownOpen(dropdownOpen === item._uid ? null : item._uid)"
                  />
                </div>
              </template>
            </template>
          </div>

          <div class="app-header__buttons">
            <button
              class="app-header__cta"
              type="button"
              :tabindex="reservationsOpen ? '0' : '-1'"
              @click="reservationsOpen = true"
            >
              <AppearanceButton>
                Reservations
              </AppearanceButton>
            </button>
          </div>
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

  @screen mdMax {
    html:has(&.app-header--is-open) {
      overflow: hidden;
    }
  }

  &--is-open,
  &--is-dropdown-open {
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
  cursor: default;

  opacity: 0;
}

.app-header__bg--mobile {
  background-color: theme('colors.green');
  transition: opacity theme('transitionDuration.500') theme('transitionTimingFunction.smooth');

  .app-header--is-open & {
    pointer-events: auto;
    opacity: 1;
  }

  @screen md {
    display: none;
  }
}

.app-header__bg--desktop {
  background-color: var(--app-header-background-tint);
  backdrop-filter: var(--app-header-blur);
  transition: opacity theme('transitionDuration.1000') theme('transitionTimingFunction.smooth');

  .app-header--is-dropdown-open & {
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

  @screen md {
    display: none;
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

  @screen mdMax {
    position: absolute;
    inset: 0;
    height: 100vh;
    height: 100dvh;
    overflow-y: auto;
    overscroll-behavior: contain;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.25s theme('transitionTimingFunction.smooth'),
      visibility 0.25s theme('transitionTimingFunction.smooth');

    .app-header--is-open & {
      opacity: 1;
      visibility: visible;
      transition:
        opacity 1s theme('transitionTimingFunction.smooth') 0.25s,
        visibility 1s theme('transitionTimingFunction.smooth') 0.25s;
    }
  }
}

.app-header__navigation {
  font-size: theme('fontSize.24');

  @screen md {
    font-size: clamp(1rem, 0.7778rem + 0.463vw, 1.125rem); /* 16px - 18px */
  }

  @screen mdMax {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: center;
    padding-top: var(--app-header-height);
    padding-bottom: theme('spacing.40');
    width: 100%;
    min-height: 100%;
  }
}

.app-header__list {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;

  @screen md {
    gap: theme('spacing.20');
    flex-direction: row;
    width: auto;
    flex-grow: 0;
  }

  @screen lg {
    gap: theme('spacing.30');
  }
}

.app-header__item {
  &--link {
    display: block;
    padding: theme('spacing.10');
    pointer-events: auto;

    @screen md {
      padding: theme('spacing.10');
      margin: calc(-1 * theme('spacing.10'));
    }

    @screen lg {
      padding: theme('spacing.15');
      margin: calc(-1 * theme('spacing.15'));
    }
  }

  &--link:hover {
    font-style: italic;
  }

  @screen mdMax {
    width: 100%;
    text-align: center;
    transition: opacity 0.2s theme('transitionTimingFunction.smooth');

    .app-header--is-dropdown-open &:not(.app-header__item--is-open) {
      opacity: 0.3;
    }
  }

  @screen md {
    transition:
      opacity 0.5s theme('transitionTimingFunction.smooth') 0.1s,
      visibility 0.5s theme('transitionTimingFunction.smooth') 0.1s;

    .app-header__navigation:hover & {
      transition:
        opacity 0.2s theme('transitionTimingFunction.smooth') 0s,
        visibility 0.2s theme('transitionTimingFunction.smooth') 0s;
    }

    .app-header__navigation:hover &:not(:hover) {
      opacity: 0.5;
      transition:
        opacity 0.2s theme('transitionTimingFunction.smooth') 0s,
        visibility 0.2s theme('transitionTimingFunction.smooth') 0s;
    }

    .app-header--is-dropdown-open .app-header__navigation:hover &:not(:hover),
    .app-header--is-dropdown-open &:not(:hover, .app-header__item--is-open) {
      opacity: 0;
      transition-duration: 0.2s;
      transition-delay: 0s;
      pointer-events: none;
    }

    /* TODO: Dirty hack to prevent the dropdown title from being clickable when the dropdown is open */
    .app-header--is-dropdown-open &:not(.app-header__item--is-open) .app-header-dropdown__button {
      pointer-events: none;
    }
  }
}

.app-header__buttons {
  @screen mdMax {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 40px;
  }
}

.app-header__cta {
  translate: 0 50% 0;
  display: block;
  pointer-events: auto;
  opacity: 0;
  transition:
    opacity theme('transitionDuration.100') theme('transitionTimingFunction.smooth'),
    translate 0s theme('transitionDelay.100');

  .app-header--is-open & {
    translate: 0 0 0;
    opacity: 1;
    transition:
      opacity theme('transitionDuration.500') theme('transitionTimingFunction.outQuart')
        0.5s,
      translate theme('transitionDuration.500') theme('transitionTimingFunction.outQuart')
        0.5s;
  }

  @screen md {
    display: none;
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
  .app-header--logo-hidden &,
  .app-header--is-dropdown-open &,
  .app-header--has-scrolled-past-viewport & {
    pointer-events: none;
    translate: 0 -15% 0;
    opacity: 0;
    transition:
      opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth'),
      translate theme('transitionDuration.200') theme('transitionTimingFunction.smooth');
  }

  @screen mdMax {
    .app-header--is-open & {
      pointer-events: none;
      opacity: 0;
      transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');
    }
  }
}

.app-header__logo-icon {
  width: 113px;
  height: auto;
  aspect-ratio: 113 / 47;

  @screen md {
    width: clamp(90px, -70px + 20.8333vw, 180px);
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
