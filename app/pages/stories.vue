<script lang="ts" setup>
import type { Page } from '#storyblok-components'

const route = useRoute()

definePageMeta({
  scrollToTop: (to, from) => {
    return !(to.path === '/stories' && from.path.startsWith('/stories/') && from.path.length > 9)
  },
})

const story = await useStory<Page>('/stories')
const { title, description, image } = story.value.content.seo?.[0] ?? {}
const imageOptions = { width: 1200, height: 630, format: 'jpg', smart: true, quality: 90 }

useSeoMeta({
  title: title ?? story.value.name,
  description,
  ogTitle: title ?? story.value.name,
  ogDescription: description,
  ogImage: storyblokImage(image?.filename, imageOptions) || null,
  ogImageWidth: imageOptions.width,
  ogImageHeight: imageOptions.height,
  ogType: 'website',
})
</script>

<template>
  <AppTheme
    v-if="story"
    :themes="story.content.themes"
  >
    <AppStory
      :is-open="route.name === 'stories-page'"
    >
      <Transition
        name="fade"
        mode="out-in"
      >
        <div
          v-if="route.name === 'stories-page'"
          :key="route.fullPath"
        >
          <Suspense>
            <NuxtPage :page-key="route => route.fullPath" />
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
