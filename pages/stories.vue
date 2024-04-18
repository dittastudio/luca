<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

const route = useRoute()
const story = await useStoryblokStory<PageStoryblok>(route.path)

if (!story.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Page not found`,
    fatal: false,
  })
}

useStoryblokSeo(story)

const counter = ref(0)

onMounted(() => {
  if (story.value) {
    useStoryblokBridge(story.value.id, (evStory: any) => (story.value = evStory), {
      preventClicks: true,
    })
  }

  setInterval(() => {
    counter.value++
  }, 1000)
})

definePageMeta({
  // key: route => route.fullPath,
  keepalive: true,
})
</script>

<template>
  <div class="wrapper">
    <p>
      Test link {{ counter }}
      <NuxtLink to="/stories/vitra-luca">Vitra + Luca</NuxtLink>
    </p>

    <p>{{ $route.name }}</p>

    <AppModal :is-open="$route.name === 'stories-page'">
      <transition name="fade">
        <NuxtPage />
      </transition>
    </AppModal>

    <BlockComponents :content="story.content" />
  </div>
</template>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
