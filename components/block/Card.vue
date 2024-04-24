<script lang="ts" setup>
import type { BlockCardStoryblok } from '@/types/storyblok'
import { colSpanMap, colStartMap } from '@/utilities/maps'

interface Props {
  block: BlockCardStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="block-card wrapper"
  >
    <div
      :class="[
        colSpanMap[block.column_span],
        colStartMap[block.column_start],
      ]"
    >
      <StoryblokLink :item="block.link">
        <CardMedia
          :title="block.title"
          :headline="block.headline"
        >
          <template #media>
            <NuxtImg
              v-if="block.media[0]?.component === 'image' && block.media[0]?.image"
              provider="storyblok"
              :src="block.media[0]?.image.filename"
              :alt="block.media[0]?.image.alt"
              :sizes="`
                100vw
                sm:100vw
                md:${Number(block.column_span) / 12 * 100}vw
                3xl:${Number(block.column_span) / 12 * 1800}px
              `"
              loading="lazy"
            />

            <MediaVideo
              v-else-if="block.media[0]?.component === 'video' && block.media[0]?.video"
              :asset="block.media[0]?.video"
              :ratio="block.media[0]?.ratio"
            />
          </template>
        </CardMedia>
      </StoryblokLink>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.block-card {
  @screen md {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: var(--app-inner-gutter);
  }
}
</style>
