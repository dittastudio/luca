<script lang="ts" setup>
import { storyblokImage } from '@/utilities/helpers'
import type { PageStoryblok } from '@/types/storyblok'

const route = useRoute()
const story = await useStory<PageStoryblok>(route.path)

if (!story.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Page not found`,
    fatal: false,
  })
}

const seo = story.value.content?.seo?.[0]
const { title, description, image } = seo || {}

useSeoMeta({
  title: title ?? story.value.name,
  description: description,
  ogTitle: title ?? story.value.name,
  ogDescription: description,
  ogImage: storyblokImage(image?.filename, { width: 1230, height: 630 }) || null,
  ogType: 'website',
  twitterTitle: title ?? story.value.name,
  twitterCard: 'summary_large_image',
  twitterImage: storyblokImage(image?.filename, { width: 1230, height: 630 }) || null,
})

onMounted(() => {
  if (story.value) {
    useStoryblokBridge(story.value.id, (evStory: any) => (story.value = evStory), {
      preventClicks: true,
    })
  }
})
</script>

<template>
  <div class="wrapper">
    <h1>Luca</h1>
    <!-- <Screen :log="seo" label="SEO Stuff" /> -->
  </div>
</template>

<style lang="postcss" scoped></style>
