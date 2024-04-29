<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

const route = useRoute()
const story = await useStoryblokStory<PageStoryblok>('/stories')

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
    <div class="wrapper">
      <AppStory :is-open="route.name === 'stories-page'">
        <transition
          name="fade"
          mode="out-in"
        >
          <div
            v-if="route.name === 'stories-page'"
            :key="route.fullPath"
          >
            <NuxtPage :page-key="route.fullPath" />
          </div>
        </transition>
      </AppStory>
    </div>

    <PageCover
      v-if="story.content.cover_message"
      :message="story.content.cover_message"
    />

    <BlockComponents :content="story.content" />
  </AppTheme>
</template>
