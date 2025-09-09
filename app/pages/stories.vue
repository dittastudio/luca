<script lang="ts" setup>
import type { Page } from '@@/.storyblok/types/285210/storyblok-components'

definePageMeta({ scrollToTop: false })

const route = useRoute()
const story = await useStory<Page>('/stories')
const { title, description, image } = story.value.content.seo?.[0] ?? {}
const imageOptions = { width: 1200, height: 630, format: 'jpg', smart: true, quality: 90 }

useSeoMeta({
  title: title ?? story.value.name,
  description,
  ogTitle: title ?? story.value.name,
  ogDescription: description,
  ogImage: storyblokImage(image?.filename, imageOptions) || null,
  ogType: 'website',
  twitterTitle: title ?? story.value.name,
  twitterCard: 'summary_large_image',
  twitterImage: storyblokImage(image?.filename, imageOptions) || null,
})
</script>

<template>
  <AppTheme
    v-if="story"
    :themes="story.content.themes"
  >
    <AppStory :is-open="route.name === 'stories-page'">
      <Transition
        name="fade"
        mode="out-in"
      >
        <div
          v-if="route.name === 'stories-page'"
          :key="route.fullPath"
        >
          <Suspense>
            <NuxtPage :page-key="route.fullPath" />
          </Suspense>
        </div>
      </Transition>
    </AppStory>

    <PageCover
      v-if="story.content.cover_message"
      :message="story.content.cover_message"
    />

    <BlockComponents :content="story.content" />
  </AppTheme>
</template>
