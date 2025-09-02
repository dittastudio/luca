<script lang="ts" setup>
import { useIntersectionObserver, useScroll } from '@vueuse/core'
import IconLucaLogo from '@/assets/icons/luca-logo.svg'

const isMd = useAtMedia(getMediaQuery('md'))

const isHidden = ref(false)
const isCoverLogoShown = useState('isCoverLogoShown', () => false)
const footer = ref<HTMLElement | null>(null)

onMounted(() => {
  footer.value = document.querySelector('footer')

  if (!footer.value || !isMd.value)
    return

  useIntersectionObserver(
    footer.value,
    ([target]) => {
      if (!target)
        return

      isHidden.value = target.isIntersecting
    },
    {
      rootMargin: '0px 0px 25% 0px',
      threshold: 0,
    },
  )
})

const { y } = useScroll(window)

const stylesOut = computed(() => {
  if (import.meta.server || isMd.value) {
    return { opacity: 1 }
  }

  const scrollThreshold = window.innerHeight / 2
  const opacityValue = Math.max(0, Math.min(1, 1 - (y.value / scrollThreshold)))

  return { opacity: opacityValue }
})

watch(() => stylesOut.value.opacity, (opacity) => {
  isCoverLogoShown.value = opacity > 0
})

onMounted(() => {
  isCoverLogoShown.value = stylesOut.value.opacity > 0
})
</script>

<template>
  <div
    class="
      sticky
      top-0
      -mt-(--app-cover-logo-height)
      z-(--app-layer-one)
      flex
      items-center
      justify-center
      w-full
      h-(--app-cover-logo-height)
      text-white
      pointer-events-none
      transition-opacity
      duration-300
      ease-smooth
      max-md:drop-shadow-lg
    "
    :class="{
      'opacity-100': !isHidden,
      'opacity-0': isHidden,
    }"
  >
    <IconLucaLogo
      class="w-(--app-logo-responsive-width) h-auto"
      :style="stylesOut"
    />
  </div>
</template>
