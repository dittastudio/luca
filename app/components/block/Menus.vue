<script lang="ts" setup>
import type { BlockMenus, LinkGroup, Settings } from '@@/.storyblok/types/285210/storyblok-components'

interface Props {
  block: BlockMenus
}

const { block } = defineProps<Props>()

const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))

const settings = await useStory<Settings>('/settings')

// Hacky as FOOK: Get the menus from the navigation_new field
const targetMenuNavigation = settings.value?.content?.navigation_new?.find(
  (item): item is LinkGroup =>
    item._uid === 'fe37b5ba-350c-46ae-8f1f-cde1956b0268' && 'links' in item,
)

const getMenus = computed(() => {
  if (targetMenuNavigation?.links) {
    return targetMenuNavigation.links.map(({ _uid, title, link }) => ({
      type: 'link',
      _uid,
      title,
      url: link?.url || '',
    }))
  }
  if (block.menus) {
    return block.menus.map(({ _uid, title, pdf }) => ({
      type: 'menu',
      _uid,
      title,
      url: pdf?.filename || '',
    }))
  }
  return []
})
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
          v-for="menu in getMenus"
          :key="menu._uid"
          class="flex flex-col items-center text-center"
        >
          <NuxtLink
            class="block-menus__link w-full p-2 md:py-[3px] transition-opacity duration-200 ease-smooth hover:font-italic group-hover:not-hover:opacity-60"
            :to="menu.url"
            target="_blank"
          >
            {{ menu.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
