<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

const route = useRoute()
const story = await useStoryblokStory<PageStoryblok>('/stories')

useStoryblokSetup(story)
useNavigation(false)
</script>

<template>
  <AppTheme :themes="story.content.themes">
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
