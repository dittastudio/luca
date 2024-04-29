<script lang="ts" setup>
import { wait } from '@/utilities/helpers'

interface Props {
  message: string
}

const { message } = defineProps<Props>()

const coverVisible = ref(true)
const messageVisible = ref(false)

onMounted(async () => {
  await wait(1000)
  messageVisible.value = true
  await wait(2000)
  messageVisible.value = false
  await wait(1000)
  coverVisible.value = false
})
</script>

<template>
  <div :class="['page-cover', { 'is-active': coverVisible }]">
    <div class="wrapper">
      <h1 :class="['page-cover__message', { 'is-active': messageVisible }]">
        {{ message }}
      </h1>
    </div>
  </div>
</template>

<style lang="postcss">
html {
  &:not(.is-storyblok-editor):has(.page-cover.is-active) {
    overflow: hidden;
  }

  &.is-storyblok-editor {
    .page-cover {
      display: none;
    }
  }
}
</style>

<style lang="postcss" scoped>
.page-cover {
  pointer-events: none;
  position: fixed;
  z-index: var(--app-layer-three);
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  height: 100dvh;
  color: var(--app-text-color);
  background-color: var(--app-background-color);

  &.is-active {
    pointer-events: auto;
  }

  &,
  &__message {
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
}
</style>
