<script lang="ts" setup>
import { isStoryblokEditor } from '@/utilities/helpers'
import type { SettingsStoryblok } from '@/types/storyblok'

const route = useRoute()
const story = await useStory<SettingsStoryblok>('/settings')

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
        <AppNavigation :list="story.content.navigation?.[0]" />

        <!-- <Screen label="Navigation" :log="story.content.navigation?.[0]" /> -->
      </template>

      <template #main>
        <NuxtPage />
      </template>

      <template #footer>
        <AppFooter
          :openingTimesTitle="story.content.opening_times_title"
          :openingTimes="story.content.opening_times"
          :contactTitle="story.content.contact_title"
          :contact="story.content.contact"
          :reservationsTitle="story.content.reservations_title"
          :reservations="story.content.reservations"
          :newsletterTitle="story.content.newsletter_title"
          :newsletter="story.content.newsletter"
        />
      </template>
    </LayoutApp>
  </div>
</template>
