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

const reservationsOpen = useState<boolean>('reservationsOpen')
const navigationOpen = useState<boolean>('navigationOpen')
const dropdownOpen = useState<string | null>('dropdownOpen')
const isLogoPassed = useState<boolean>('isLogoPassed')

const route = useRoute()
const isHome = computed(() => ['/', '/home'].includes(route.path))

const headerClasses = computed<Record<string, boolean>>(() => ({
  'app-header--is-open': navigationOpen.value,
  'app-header--is-dropdown-open': dropdownOpen.value !== null,
  'app-header--has-scrolled': hasScrolled.value,
  'app-header--has-scrolled-up': hasScrolledUp.value,
  'app-header--has-scrolled-down': hasScrolledDown.value,
  'app-header--has-scrolled-past-logo': isHome.value && isLogoPassed.value,
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
    class="app-header relative isolate h-(--app-header-height) transition-color duration-(--app-header-speed) ease-smooth"
    :class="headerClasses"
    @keyup.esc="closeAllMenus"
  >
    <!-- START: Mobile only background overlay -->
    <button
      tabindex="-1"
      :class="[
        'app-header__bg--mobile',
        'absolute inset-0 h-screen cursor-default bg-green',
        'md:hidden',
      ]"
      type="button"
      @click="closeAllDropdowns"
    >
      <span class="sr-only">Close Menu</span>
    </button>
    <!-- END: Mobile only background overlay -->

    <!-- START: Desktop only background overlay -->
    <button
      tabindex="-1"
      :class="[
        'app-header__bg--desktop',
        'absolute inset-0 h-screen cursor-default bg-(--app-header-background-tint) backdrop-blur-(--app-header-blur)',
        'max-md:hidden',
      ]"
      type="button"
      @click="closeAllDropdowns"
    >
      <span class="sr-only">Close Dropdown</span>
    </button>
    <!-- END: Desktop only background overlay -->

    <!-- START: Mobile only hamburger -->
    <div class="relative flex items-center justify-between h-full py-(--app-header-padding-y) md:items-start wrapper">
      <button
        :class="[
          'app-header__switch',
          'relative z-1 -m-4 p-4 pointer-events-auto',
          'md:hidden',
        ]"
        type="button"
        @click="toggleNavigation"
      >
        <AppHeaderBurger :is-open="navigationOpen" />
      </button>
      <!-- END: Mobile only hamburger -->

      <div
        :class="[
          'app-header__menu',
          'md:relative md:z-1 md:flex md:gap-2 md:items-start',
          'max-md:absolute max-md:inset-0 max-md:overflow-y-auto max-md:overscroll-contain max-md:h-dvh',
        ]"
      >
        <nav
          :class="[
            'type-body-large',
            'text-24 md:text-16 lg:text-18',
            'max-md:flex max-md:flex-wrap max-md:items-end max-md:justify-center',
            'max-md:w-full max-md:min-h-full max-md:pt-(--app-header-height) max-md:pb-8',
          ]"
        >
          <div
            :class="[
              'flex flex-col flex-grow w-full',
              'md:flex-row md:flex-grow-0 md:gap-4 md:w-auto',
              'lg:gap-6',
            ]"
          >
            <template
              v-for="item in items"
              :key="item._uid"
            >
              <StoryblokLink
                v-if="isLink(item)"
                :class="[
                  'app-header__item',
                  'block p-2 pointer-events-auto',
                  'md:-m-2 md:p-2',
                  'lg:-m-3 lg:p-3',
                  'max-md:w-full max-md:text-center',
                  'hover:italic',
                ]"
                :item="item.link"
                :title="item.title"
              >
                {{ item.title }}
              </StoryblokLink>

              <template v-else-if="isLinkGroup(item)">
                <div
                  :class="[
                    'app-header__item',
                    'block pointer-events-auto',
                    'md:-m-2 md:p-2',
                    'lg:-m-3 lg:p-3',
                    'max-md:w-full max-md:text-center',
                    { 'app-header__item--is-open': dropdownOpen === item._uid },
                  ]"
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

          <div class="max-md:flex max-md:justify-center max-md:w-full max-md:pt-8">
            <button
              :class="[
                'app-header__cta',
                'block pointer-events-auto md:hidden',
              ]"
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

      <div class="absolute inset-0 flex items-center justify-center p-(--app-header-padding-y) md:items-start">
        <NuxtLink
          to="/"
          class="app-header__logo-link block"
        >
          <IconLucaLogo class="w-[113px] h-auto aspect-[113/47] md:w-[clamp(90px,_-70px_+_20.8333vw,_180px)]" />

          <span class="sr-only">Luca</span>
        </NuxtLink>
      </div>

      <div class="app-header__details flex gap-6 items-center">
        <IconMichelin class="w-[20px] h-[23px] max-md:hidden" />

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
      class="absolute inset-0 -z-1 pointer-events-none"
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

<style>
@reference "@/assets/css/main.css";

.app-header {
  @variant max-md {
    html:has(&.app-header--is-open) {
      overflow: hidden;
    }
  }

  &--is-open,
  &--is-dropdown-open {
    color: var(--color-white);

    .appearance-button {
      --button-color: var(--color-white);
      --button-hover-color: var(--color-green);
    }
  }
}

.app-header__gradient {
  translate: 0 -100% 0;
  opacity: 0;
  fill: url("#app-header__gradient");
  transition:
    opacity 0.4s var(--ease-in),
    translate 0.4s var(--ease-in);

  .app-header--has-scrolled:not(.app-header--is-open, .app-header--reservation-hidden) & {
    translate: 0 0 0;
    opacity: 1;
    transition:
      opacity 0.4s var(--ease-out),
      translate 0.4s var(--ease-out);
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

.app-header__bg--mobile {
  opacity: 0;
  transition: opacity 0.5s var(--ease-smooth);

  .app-header--is-open & {
    pointer-events: auto;
    opacity: 1;
  }
}

.app-header__bg--desktop {
  opacity: 0;
  transition: opacity 1s var(--ease-smooth);

  .app-header--is-dropdown-open & {
    pointer-events: auto;
    opacity: 1;
  }
}

.app-header__switch {
  @media (hover: hover) {
    opacity: 1;
    transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

    &:not(:active):hover {
      opacity: 0.6;
    }
  }
}

.app-header__menu {
  @variant max-md {
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

.app-header__item {
  @variant max-md {
    transition: opacity 0.2s var(--ease-smooth);

    .app-header--is-dropdown-open &:not(.app-header__item--is-open) {
      opacity: 0.3;
    }
  }

  @variant md {
    transition:
      opacity 0.5s var(--ease-smooth) 0.1s,
      visibility 0.5s var(--ease-smooth) 0.1s;

    .app-header__navigation:hover & {
      transition:
        opacity 0.2s var(--ease-smooth) 0s,
        visibility 0.2s var(--ease-smooth) 0s;
    }

    .app-header__navigation:hover &:not(:hover) {
      opacity: 0.5;
      transition:
        opacity 0.2s var(--ease-smooth) 0s,
        visibility 0.2s var(--ease-smooth) 0s;
    }

    .app-header--is-dropdown-open .app-header__navigation:hover &:not(:hover),
    .app-header--is-dropdown-open &:not(:hover, .app-header__item--is-open) {
      pointer-events: none;
      opacity: 0;
      transition-delay: 0s;
      transition-duration: 0.2s;
    }

    /* TODO: Dirty hack to prevent the dropdown title from being clickable when the dropdown is open */
    .app-header--is-dropdown-open &:not(.app-header__item--is-open) .app-header-dropdown__button {
      pointer-events: none;
    }
  }
}

.app-header__cta {
  opacity: 0;
  translate: 0 50% 0;

  transition:
    opacity 0.1s var(--ease-smooth),
    translate 0s 0.1s;

  .app-header--is-open & {
    opacity: 1;
    translate: 0 0 0;

    transition:
      opacity 0.5s var(--ease-outQuart) 0.5s,
      translate 0.5s var(--ease-outQuart) 0.5s;
  }
}

.app-header__logo-link {
  opacity: 1;
  translate: 0 0 0;
  pointer-events: auto;

  transition:
    opacity 0.5s var(--ease-smooth),
    translate 0s 0s;

  .app-header--has-scrolled-up & {
    opacity: 1;
    translate: 0 0 0;
  }

  .app-header--has-scrolled-down &,
  .app-header--logo-hidden &,
  .app-header--is-dropdown-open &,
  .app-header--has-scrolled-past-logo & {
    pointer-events: none;
    translate: 0 -15% 0;
    opacity: 0;
    transition:
      opacity 0.2s var(--ease-smooth),
      translate 0.2s var(--ease-smooth);
  }

  @variant max-md {
    .app-header--is-open & {
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s var(--ease-smooth);
    }
  }
}

.app-header__details {
  opacity: 1;
  pointer-events: auto;

  transition: opacity 0.5s var(--ease-smooth);

  .app-header--reservation-hidden & {
    opacity: 0;
    pointer-events: none;

    transition: opacity 0.2s var(--ease-smooth);
  }
}

.app-header__reservations {
  @variant max-md {
    opacity: 1;
    transition: opacity 0.2s var(--ease-smooth);

    .app-header--is-open & {
      opacity: 0;
    }
  }
}
</style>
