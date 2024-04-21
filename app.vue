<script lang="ts" setup>
import { isStoryblokEditor } from '@/utilities/helpers'
import type { SettingsStoryblok } from '@/types/storyblok'

const route = useRoute()
const story = await useStoryblokStory<SettingsStoryblok>('/settings')

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
    <AppLayout>
      <template #header>
        <AppHeader :links="story.content.navigation?.[0]" />
      </template>

      <template #main>
        <NuxtPage />
      </template>

      <template #footer>
        <AppFooter
          :opening-times-title="story.content.opening_times_title"
          :opening-times="story.content.opening_times"
          :contact-title="story.content.contact_title"
          :contact="story.content.contact"
          :reservations-title="story.content.reservations_title"
          :reservations="story.content.reservations"
          :newsletter-title="story.content.newsletter_title"
          :newsletter="story.content.newsletter"
        />
      </template>

      <template #modal>
        <DevOnly>
          <ToolGrid />
        </DevOnly>
      </template>
    </AppLayout>
  </div>
</template>
