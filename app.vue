<script lang="ts" setup>
import { isStoryblokEditor } from '@/utilities/helpers'

const route = useRoute()

const globalClasses = computed(() => ({
  'is-storyblok-editor': isStoryblokEditor(route.query),
}))

useHead({
  htmlAttrs: {
    class: globalClasses,
  },
})

useSeoMeta({
  titleTemplate: title => (title ? `${title} - Luca` : 'Luca'),
  robots: 'index, follow',
})
</script>

<template>
  <div data-component="App">
    <LayoutApp>
      <template #header>
        <AppHeader />
      </template>

      <template #main>
        <NuxtPage />
      </template>

      <template #footer>
        <div class="wrapper section">
          This is the Footer
        </div>
      </template>
    </LayoutApp>
  </div>
</template>