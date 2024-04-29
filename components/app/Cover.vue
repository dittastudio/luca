<script lang="ts" setup>
import { wait } from '@/utilities/helpers'
import IconLucaLogo from '@/assets/icons/luca-logo.svg'

interface Props {
  message: string
}

const { message } = defineProps<Props>()

const coverVisible = ref(true)
const messageVisible = ref(false)
const logoVisible = ref(false)

onMounted(async () => {
  await wait(1000)
  messageVisible.value = true
  await wait(2000)
  messageVisible.value = false
  await wait(1000)
  logoVisible.value = true
  await wait(2000)
  coverVisible.value = false
})
</script>

<template>
  <div :class="['cover', { 'is-active': coverVisible }]">
    <div class="wrapper">
      <h1 :class="['cover__message', { 'is-active': messageVisible }]">
        {{ message }}
      </h1>

      <IconLucaLogo :class="['cover__logo', { 'is-active': logoVisible }]" />
    </div>
  </div>
</template>

<style lang="postcss">
html {
  &:not(.is-storyblok-editor):has(.cover.is-active) {
    overflow: hidden;
  }

  &.is-storyblok-editor {
    .cover {
      display: none;
    }
  }
}
</style>

<style lang="postcss" scoped>
.cover {
  pointer-events: none;

  position: fixed;
  z-index: var(--app-layer-three);
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  height: 100dvh;

  color: theme('colors.white');

  background-color: theme('colors.green');

  &.is-active {
    pointer-events: auto;
  }

  &,
  &__message,
  &__logo {
    opacity: 0;
    transition: opacity theme('transitionDuration.500') theme('transitionTimingFunction.smooth');

    &.is-active {
      opacity: 1;
    }
  }

  &__message {
    font-size: theme('fontSize.responsive-message');
    text-align: center;
    text-wrap: balance;
  }

  &__logo {
    --logo-responsive-width: 60vw;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);

    width: var(--logo-responsive-width);
    height: auto;

    @screen md {
      --logo-responsive-width: 31.55vw;
    }

    @screen 2xl {
      --logo-responsive-width: 454px;
    }
  }
}
</style>
