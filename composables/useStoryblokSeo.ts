import { storyblokImage } from '@/utilities/helpers'
import type { Ref } from 'vue'

export const useStoryblokSeo = async (story: Ref) => {
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

  // const nuxtApp = useNuxtApp();
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // nuxtApp.runWithContext(() => useSeoMeta(() => ({
  //   title: `title`,
  //   description: `description`,
  // })));
}
