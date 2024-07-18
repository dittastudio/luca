<script lang="ts" setup>
import '@/utilities/colophon'
import { storyblokEditor } from '@/utilities/storyblok'
import { screenSizes } from '@/tailwind.config'
import type { SettingsStoryblok } from '@/types/storyblok'

const route = useRoute()
const story = await useStoryblokStory<SettingsStoryblok>('/settings')
const isMd = useAtMedia(`(min-width: ${screenSizes.md}px)`)
const isHome = computed(() => ['/', '/home'].includes(route.path) && isMd.value)
const isStory = computed(() => route.path.startsWith('/stories/') && route.path.length > 9)
const isDev = import.meta.dev

const globalClasses = computed(() => ({
  'is-storyblok-editor': storyblokEditor(route.query),
}))

useHead({
  htmlAttrs: {
    class: globalClasses,
  },
})

useSeoMeta({
  titleTemplate: title => (title ? `${title} - LUCA` : 'LUCA'),
  robots: 'index, follow',
})

const splashSeen = useState('splashSeen', () => false)

useState('reservationsOpen', () => false)
useState('navigationOpen', () => false)
useNavigation(false)

if (isStory.value) {
  splashSeen.value = true
}
</script>

<template>
  <div>
    <AppLayout>
      <template #header>
        <AppHeader
          v-if="story"
          :links="story.content.navigation?.[0]"
          :logo-hidden="isHome || isStory"
          :reservation-hidden="isStory"
        />
      </template>

      <template #main>
        <NuxtPage />
      </template>

      <template #footer>
        <AppFooter
          v-if="story"
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
          :social-vimeo="story.content.social_vimeo"
        >
          <template #navigation>
            <AppFooterNavigation :list="story.content.footer?.[0]" />
          </template>
        </AppFooter>
      </template>

      <template #dev>
        <ToolGrid v-if="isDev || storyblokEditor(route.query)" />
      </template>
    </AppLayout>

    <AppCover
      v-if="story && story.content.cover_message && !splashSeen && !isDev"
      :message="story.content.cover_message"
    />
  </div>
</template>
