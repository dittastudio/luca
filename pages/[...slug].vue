<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

const route = useRoute()
const story = await useStoryblokStory<PageStoryblok>(route.path)

if (!story.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Page not found`,
    fatal: true,
  })
}

useStoryblokSetup<PageStoryblok>(story)

const isHome = computed(() => ['/', '/home'].includes(route.path))
</script>

<template>
  <AppTheme :themes="story.content.themes">
    <AppCoverLogo v-if="isHome" />

    <PageCover
      v-if="story.content.cover_message"
      :message="story.content.cover_message"
    />

    <BlockComponents :content="story.content" />
  </AppTheme>
</template>
