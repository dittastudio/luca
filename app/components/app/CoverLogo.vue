<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import IconLucaLogo from '@/assets/icons/luca-logo.svg'

const isHidden = ref(false)
const main = ref<HTMLElement | null>(null)

onMounted(() => {
  main.value = document.querySelector('main')

  if (!main.value)
    return

  useIntersectionObserver(
    main,
    ([target]) => {
      if (!target)
        return

      isHidden.value = !target.isIntersecting
    },
    {
      rootMargin: '-110% 0px 0px 0px',
      threshold: 0,
    },
  )
})
</script>

<template>
  <div
    class="
      sticky
      top-0
      -mt-[100dvh]
      z-(--app-layer-one)
      flex
      items-center
      justify-center
      w-full
      h-dvh
      text-white
      pointer-events-none
      transition-opacity
      duration-300
      ease-smooth
      max-md:hidden
    "
    :class="{
      'opacity-100': !isHidden,
      'opacity-0': isHidden,
    }"
  >
    <IconLucaLogo class="w-(--app-logo-responsive-width) h-auto" />
  </div>
</template>
