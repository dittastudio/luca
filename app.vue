<script lang="ts" setup>
import { isStoryblokEditor } from '@/utilities/helpers'
import { screenSizes } from '@/tailwind.config'
import type { SettingsStoryblok } from '@/types/storyblok'

const route = useRoute()
const story = await useStoryblokStory<SettingsStoryblok>('/settings')
const isMd = useAtMedia(`(min-width: ${screenSizes.md}px)`)
const isHome = computed(() => route.path === '/' && isMd.value)
const isStoryPage = computed(() => route.path.startsWith('/stories/') && route.path.length > 9)
const isDev = import.meta.dev

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
  robots: 'noindex, nofollow',
})

useState('reservationsOpen', () => false)
useState('navigationOpen', () => false)
</script>

<template>
  <div>
    <AppLayout>
      <template #header>
        <AppHeader
          :links="story.content.navigation?.[0]"
          :logo-hidden="isHome || isStoryPage"
          :reservation-hidden="isStoryPage"
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

      <template #dev>
        <ToolGrid v-if="isDev || isStoryblokEditor(route.query)" />
      </template>
    </AppLayout>

    <AppCover
      v-if="!isDev && story.content.cover_message"
      :message="story.content.cover_message"
    />
  </div>
</template>
