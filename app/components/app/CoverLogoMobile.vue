<script lang="ts" setup>
import { useIntersectionObserver, useScroll } from '@vueuse/core'
import IconLucaLogo from '@/assets/icons/luca-logo.svg'

const { y } = useScroll(window)

const coverVisible = useState('coverVisible', () => true)
const isLogoPassed = useState('isLogoPassed', () => false)
const splashSeen = useState('splashSeen', () => false)
const isDev = import.meta.dev

const logoRef = ref<HTMLElement>()

const stylesOut = computed(() => {
  if (import.meta.server) {
    return { opacity: 1 }
  }

  const scrollThreshold = window.innerHeight / 3
  const opacityValue = Math.max(0, Math.min(1, 1 - (y.value / scrollThreshold)))
  return { opacity: opacityValue }
})

useIntersectionObserver(logoRef, ([target]) => {
  if (target) {
    isLogoPassed.value = target.isIntersecting
  }
}, { rootMargin: '0px 0px 0px 0px', threshold: 0 })
</script>

<template>
  <div class="relative">
    <slot />

    <div
      :class="[
        'transition-all duration-2000 ease-outQuart delay-1000',
        {
          'opacity-0': coverVisible && !isDev && !splashSeen,
          'opacity-100': !coverVisible && !isDev && !splashSeen,
        },
      ]"
      class="absolute md:hidden inset-0 flex items-center justify-center pointer-events-none"
    >
      <div
        ref="logoRef"
        :style="stylesOut"
      >
        <IconLucaLogo
          class="w-(--app-logo-responsive-width) h-auto transition-opacity duration-1000 ease-outQuart text-white"
        />
      </div>
    </div>
  </div>
</template>
