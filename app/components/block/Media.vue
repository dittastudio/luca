<script lang="ts" setup>
import type { BlockMedia } from '@@/.storyblok/types/285210/storyblok-components'

interface Props {
  block: BlockMedia
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
      <MediaImage
        v-if="block.media && assetType === 'image'"
        class="rounded-xs"
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
        class="rounded-xs"
        :asset="block.media"
        :ratio="block.ratio"
      />

      <p
        v-if="block.caption"
        class="mt-[8px] type-body italic"
      >
        {{ block.caption }}
      </p>
    </div>
  </div>
</template>
