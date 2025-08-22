<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import IconLucaLogo from '@/assets/icons/luca-logo.svg'

const isHidden = ref(false)
const main = ref<HTMLElement | null>(null)

const isLogoPassed = useState('isLogoPassed', () => false)
const logoRef = ref<HTMLElement>()

onMounted(() => {
  main.value = document.querySelector('main')

  if (!main.value) {
    return
  }

  useIntersectionObserver(
    main,
    ([target]) => {
      if (!target) {
        return
      }

      isHidden.value = !target.isIntersecting
    },
    { rootMargin: '-100% 0px 0px 0px', threshold: 0 },
  )
})

useIntersectionObserver(
  logoRef,
  ([target]) => {
    if (!target) {
      return
    }

    isLogoPassed.value = target.isIntersecting
  },
  {
    threshold: 0,
    rootMargin: '0px',
  },
)
</script>

<template>
  <div
    :class="[
      'absolute z-(--app-layer-one) top-0 left-0',
      'flex items-center justify-center',
      'w-full h-dvh',
      'text-white pointer-events-none',
      'drop-shadow-[0_0_15px_--alpha(var(--color-black),_30%)]',
      'transition-opacity duration-300 ease-smooth',
      'md:sticky md:-mt-[100dvh]',
      {
        'opacity-100': !isHidden,
        'opacity-0': isHidden,
      },
    ]"
  >
    <div ref="logoRef">
      <IconLucaLogo class="w-(--app-logo-responsive-width) h-auto" />
    </div>
  </div>
</template>
