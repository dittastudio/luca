<script lang="ts" setup>
import type { BlockCardEditorial } from '@@/.storyblok/types/285210/storyblok-components'

interface Props {
  block: BlockCardEditorial
}

const { block } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
const columnSpan = computed(() => Number(block.column_end) - Number(block.column_start))
</script>

<template>
  <div
    v-editable="block"
    class="wrapper md:grid md:grid-cols-(--app-grid) md:gap-(--app-inner-gutter)"
  >
    <div
      :class="[
        colStartMap[block.column_start],
        colEndMap[block.column_end],
      ]"
    >
      <StoryblokLink
        class="group block"
        :item="block.link"
      >
        <figure>
          <MediaImage
            v-if="block.media && assetType === 'image'"
            class="rounded-xs opacity-100 transition-opacity duration-500 ease-outQuart group-hover:opacity-80"
            :asset="block.media"
            :ratio="block.ratio"
            :sizes="`
              100vw
              sm:100vw
              md:${columnSpan / 12 * 100}vw
              3xl:${columnSpan / 12 * 1800}px
            `"
          />

          <MediaVideo
            v-else-if="block.media && assetType === 'video'"
            class="rounded-xs opacity-100 transition-opacity duration-500 ease-outQuart group-hover:opacity-80"
            :asset="block.media"
            :ratio="block.ratio"
          />

          <figcaption
            v-if="block.title"
            class="type-body-large italic mt-1"
          >
            {{ block.title }}
          </figcaption>
        </figure>
      </StoryblokLink>
    </div>
  </div>
</template>
