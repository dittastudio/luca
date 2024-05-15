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
  <div class="w-full min-h-screen flex items-center justify-center section wrapper">
    <div class="flex flex-col items-center justify-center gap-40 text-center">
      <h1>
        <NuxtLink to="/">
          <IconLucaLogo class="w-150 h-auto" />

          <span class="sr-only">Luca</span>
        </NuxtLink>
      </h1>

      <p class="type-body max-w-[45ch] mx-auto">
        Ci scusiamo, the page you were looking for couldn't be found. It may have been moved.
      </p>

      <NuxtLink to="/">
        <AppearanceButton>
          Back to home
        </AppearanceButton>
      </NuxtLink>
    </div>
  </div>
</template>
