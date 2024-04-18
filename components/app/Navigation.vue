<script lang="ts" setup>
import type { LinkListStoryblok } from '@/types/storyblok'

interface Props {
  list?: LinkListStoryblok
}

const { list } = defineProps<Props>()
const items = computed(() => list?.items ?? [])
</script>

<template>
  <nav data-component="AppNavigation">
    <ul>
      <li v-for="item in items">
        <StoryblokLink :item="item.link">
          {{ item.title }}
        </StoryblokLink>
      </li>
    </ul>
  </nav>
</template>
