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

useStoryblokSetup<PageStoryblok>(story)
</script>

<template>
  <AppTheme :themes="story.content.themes">
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
