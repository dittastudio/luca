<script lang="ts" setup>
import type { Settings } from '@@/.storyblok/types/285210/storyblok-components'

const route = useRoute()
const router = useRouter()
const routePath = computed(() => router.currentRoute.value.path)
const story = await useStory<Settings>('/settings')
const isHome = computed(() => ['/', '/home'].includes(routePath.value))
const isStory = computed(() => routePath.value.startsWith('/stories/') && routePath.value.length > 9)
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
useState<string | null>('dropdownOpen', () => null)
useState<boolean>('coverVisible', () => true)
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
          :items="story.content.navigation_new"
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
