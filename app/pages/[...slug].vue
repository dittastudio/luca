<script lang="ts" setup>
import type { PageStoryblok } from '@@/types/storyblok'

const route = useRoute()
const story = await useStory<PageStoryblok>(route.path)
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

const isHome = computed(() => ['/', '/home'].includes(route.path))
</script>

<template>
  <AppTheme
    v-if="story"
    :themes="story.content.themes"
  >
    <AppCoverLogo v-if="isHome" />

    <PageCover
      v-if="story.content.cover_message"
      :message="story.content.cover_message"
    />

    <BlockComponents :content="story.content" />
  </AppTheme>
</template>
