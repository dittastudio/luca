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

const isHome = computed(() => route.path === '/')
</script>

<template>
  <div>
    <AppLayout>
      <template #header>
        <AppHeader
          :logo-hidden="isHome"
          :links="story.content.navigation?.[0]"
        />
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
          :social-facebook="story.content.social_facebook"
          :social-tiktok="story.content.social_tiktok"
          :social-instagram="story.content.social_instagram"
        >
          <template #navigation>
            <AppFooterNavigation :list="story.content.footer?.[0]" />
          </template>
        </AppFooter>
      </template>

      <template #modal>
        <DevOnly>
          <ToolGrid />
        </DevOnly>
      </template>
    </AppLayout>
  </div>
</template>
