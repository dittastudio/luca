<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

const route = useRoute()
const story = await useStoryblokStory<PageStoryblok>(route.path)

useStoryblokSetup(story)
useNavigation(false)

const setAppTheme = (theme: Luca.Theme) => {
  document.documentElement.style.setProperty('--app-background-color', theme.background)
  document.documentElement.style.setProperty('--app-text-color', theme.text)
}
</script>

<template>
  <AppTheme
    :themes="story.content.themes"
    @theme="setAppTheme"
  >
    <PageCover
      v-if="story.content.cover_message"
      :message="story.content.cover_message"
    />

    <BlockComponents :content="story.content" />
  </AppTheme>
</template>
