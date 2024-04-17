<script lang="ts" setup>
// import IconLucaLogo from '@/assets/icons/luca-logo.svg'

// const prevScrollPos = ref<number>(0)
// const hasScrolled = ref<boolean>(false)
// const hasScrolledUp = ref<boolean>(false)
// const hasScrolledDown = ref<boolean>(false)
// const raf = ref<any>(null)

// const handleScroll = () => {
//   const triggerPoint = 50

//   const scrollPos = window.scrollY

//   hasScrolled.value = scrollPos > triggerPoint

//   // Scrolling up
//   if (prevScrollPos.value > scrollPos) {
//     hasScrolledUp.value = scrollPos > triggerPoint
//     hasScrolledDown.value = false

//     // Scrolling down
//   } else {
//     hasScrolledUp.value = false
//     hasScrolledDown.value = scrollPos > triggerPoint
//   }

//   prevScrollPos.value = scrollPos

//   raf.value = null
// }

// const rAFHeaderScroll = () => {
//   if (!raf.value) {
//     raf.value = requestAnimationFrame(handleScroll)
//   }
// }

// onMounted(() => {
//   rAFHeaderScroll()
//   window.addEventListener('scroll', rAFHeaderScroll)
// })

// const headerClasses = computed<any>(() => ({
//   'app-header--has-scrolled': hasScrolled.value,
//   'app-header--has-scrolled-up': hasScrolledUp.value,
//   'app-header--has-scrolled-down': hasScrolledDown.value,
// }))
interface Props {
  isOpen: boolean
}

const { isOpen = false } = defineProps<Props>()
</script>

<template>
  <span class="header-burger" :class="{ 'header-burger--is-open': isOpen }">
    <span class="header-burger__inner"></span>
    <span class="sr-only">Toggle menu</span>
  </span>
</template>

<style lang="postcss" scoped>
.header-burger {
  --size: theme('spacing.32');

  display: block;
  display: flex;
  align-items: center;

  width: var(--size);
  height: var(--size);
}

.header-burger__inner {
  --burger-height: 1px;
  --burger-offset: 5px;

  position: relative;
  display: block;
  width: 100%;
  height: var(--burger-height);

  &::before,
  &::after {
    --trans-out-open: theme('transitionDuration.200') theme('transitionTimingFunction.outExpo') theme('transitionDelay.200');
    --trans-in-open: theme('transitionDuration.200') theme('transitionTimingFunction.inExpo');
    --trans-out-close: theme('transitionDuration.200') theme('transitionTimingFunction.outExpo') theme('transitionDelay.200');
    --trans-in-close: theme('transitionDuration.200') theme('transitionTimingFunction.inExpo');

    content: '';

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: currentcolor;

    transition:
      translate var(--trans-out-close),
      rotate var(--trans-in-close);
  }

  &::before {
    translate: 0 calc(-1 * var(--burger-offset)) 0;
  }

  &::after {
    translate: 0 var(--burger-offset) 0;
  }

  .header-burger--is-open & {

    &::before,
    &::after {
      transition: translate var(--trans-in-open), rotate var(--trans-out-open);
    }

    &::before {
      translate: 0 0 0;
      rotate: 45deg;
    }

    &::after {
      translate: 0 0 0;
      rotate: -45deg;
    }
  }
}
</style>
