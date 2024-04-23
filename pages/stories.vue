<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

const route = useRoute()
const story = await useStoryblokStory<PageStoryblok>('/stories')

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

const setBackground = (color: string) => {
  document.documentElement.style.setProperty('--app-background-color', color)
}
</script>

<template>
  <AppBackground
    :backgrounds="story.content.background"
    @background="setBackground"
  >
    <div class="wrapper">
      <p>
        Test link {{ counter }}
        <NuxtLink to="/stories/vitra-luca">
          Vitra + Luca
        </NuxtLink>
      </p>

      <AppModal :is-open="route.name === 'stories-page'">
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
      </AppModal>

      <BlockComponents :content="story.content" />
    </div>
  </AppBackground>
</template>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity theme('transitionDuration.500') theme('transitionTimingFunction.smooth');
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
