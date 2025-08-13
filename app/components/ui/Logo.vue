<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import IconLucaLogo from '@/assets/icons/luca-logo.svg'

const isLogoPassed = useState('isLogoPassed', () => false)

const logoRef = ref<HTMLElement>()

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
  <div class="ui-logo">
    <div ref="logoRef">
      <IconLucaLogo class="ui-logo__svg" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.ui-logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: radial-gradient(circle, theme('colors.black/30%') 0%, theme('colors.black/0%') 50%);

  @screen md {
    display: none;
  }
}

.ui-logo__svg {
  display: block;
  width: 67.5vw;
}
</style>
