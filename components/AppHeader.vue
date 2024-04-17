<script lang="ts" setup>
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
</script>

<template>
  <div class="app-header" :class="headerClasses">
    Luca
  </div>
</template>

<style lang="postcss" scoped>
.app-header {
  &--has-scrolled-up {
    translate: 0 0 0;
    transition: translate theme('transitionDuration.500') theme('transitionTimingFunction.inOutExpo');
  }

  &--has-scrolled-down {
    translate: 0 -100% 0;
    transition: translate theme('transitionDuration.200') theme('transitionTimingFunction.inQuart');
  }
}
</style>
