<script lang="ts" setup>
import IconLucaLogo from '@/assets/icons/luca-logo.svg'

definePageMeta({
  layout: false,
})

interface Props {
  error: {
    statusCode: number
    statusMessage: string
  }
}

const { error } = defineProps<Props>()

useHead({
  title:
    error?.statusCode && error?.statusMessage
      ? `${error?.statusCode} ${error?.statusMessage}`
      : 'An unexpected error occurred',
})
</script>

<template>
  <div
    data-component="Error"
    class="w-full h-screen flex items-center justify-center px-4 sm:px-6 py-24"
  >
    <div class="w-full max-w-md flex flex-col items-center justify-center gap-40 text-center">
      <h1 class="text-20">
        <NuxtLink to="/">
          <IconLucaLogo class="w-80 h-auto" />
          <span class="sr-only">Luca</span>
        </NuxtLink>
      </h1>

      <p class="text-24">
        Sorry, the page you were looking for couldn't be found. It may have been moved.
      </p>

      <p class="text-24">
        <a href="/">
          <ButtonAppearanceAlt type="green">Back to home</ButtonAppearanceAlt>
        </a>
      </p>
    </div>
  </div>
</template>
