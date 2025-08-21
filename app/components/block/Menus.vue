<script lang="ts" setup>
import type { BlockMenus } from '@@/.storyblok/types/285210/storyblok-components'

interface Props {
  block: BlockMenus
}

const { block } = defineProps<Props>()

const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="block"
    class="wrapper flex flex-col gap-12 -mt-6 backface-hidden md:gap-16 md:-mt-10"
  >
    <div
      v-if="block.media && assetType === 'image'"
      class="block-menus__banner md:grid md:grid-cols-(--app-grid) md:gap-(--app-inner-gutter)"
    >
      <MediaImage
        class="col-start-2 col-end-12 rounded-xs"
        :asset="block.media"
        ratio="5:2"
        :sizes="`
          100vw
          sm:100vw
          md:${10 / 12 * 100}vw
          3xl:${10 / 12 * 1800}px
        `"
      />
    </div>

    <nav>
      <ul class="group type-body-large flex flex-col">
        <li
          v-for="menu in block.menus"
          :key="menu._uid"
          class="flex flex-col items-center text-center"
        >
          <NuxtLink
            class="block-menus__link w-full p-2 md:py-[3px] transition-opacity duration-200 ease-smooth hover:font-italic group-hover:not-hover:opacity-60"
            :to="menu.pdf?.filename || ''"
            target="_blank"
          >
            {{ menu.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
