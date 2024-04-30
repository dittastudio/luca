import type { Ref } from 'vue'
import { storyblokImage } from '@/utilities/helpers'

export const useStoryblokSetup = async (story: Ref) => {
  if (!story.value) {
    throw createError({
      statusCode: 404,
      statusMessage: `Page not found`,
      fatal: true,
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

  return
}
