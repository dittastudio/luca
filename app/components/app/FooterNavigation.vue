<script lang="ts" setup>
import type { LinkList } from '@@/.storyblok/types/285210/storyblok-components'

interface Props {
  list?: LinkList
}

const { list } = defineProps<Props>()
const items = computed(() => list?.items ?? [])
</script>

<template>
  <ul class="text-12 tracking-wide flex flex-col items-center sm:flex-row sm:flex-wrap sm:items-start sm:mb-[-0.3em]">
    <li>
      <span class="inline-block px-1 py-2 sm:py-4 sm:-my-4 opacity-50">
        &copy;<ClientOnly>{{ new Date().getFullYear() }}</ClientOnly> All rights reserved
      </span>
    </li>

    <li
      v-for="item in items"
      :key="item._uid"
      class="sm:before:content-['/'] sm:before:opacity-50"
    >
      <StoryblokLink
        class="inline-block px-1 py-2 sm:py-4 sm:-my-4 opacity-50 transition-opacity duration-200 ease-smooth hover:opacity-100"
        :item="item.link"
      >
        {{ item.title }}
      </StoryblokLink>
    </li>

    <li class="sm:before:content-['/'] sm:before:opacity-50">
      <NuxtLink
        class="inline-block px-1 py-2 sm:py-4 sm:-my-4 opacity-50 transition-opacity duration-200 ease-smooth hover:opacity-100"
        to="https://e-i-b.com"
        target="_blank"
      >
        Design: Everything In Between
      </NuxtLink>
    </li>

    <li class="sm:before:content-['/'] sm:before:opacity-50">
      <NuxtLink
        class="inline-block px-1 py-2 sm:py-4 sm:-my-4 opacity-50 transition-opacity duration-200 ease-smooth hover:opacity-100"
        to="https://ditta.studio"
        target="_blank"
      >
        Made by ditta
      </NuxtLink>
    </li>
  </ul>
</template>
