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

useStoryblokSeo(story)

onMounted(() => {
  if (story.value) {
    useStoryblokBridge(story.value.id, (evStory: any) => (story.value = evStory), {
      preventClicks: true,
    })
  }
})

const setBackground = (color: string) => {
  document.documentElement.style.setProperty('--app-background-color', color)
}
</script>

<template>
  <AppBackground
    :backgrounds="story.content.background"
    @background="setBackground"
  >
    <BlockComponents :content="story.content" />
  </AppBackground>
</template>
