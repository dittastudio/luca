<script lang="ts" setup>
import type { BlockCard } from '@@/.storyblok/types/285210/storyblok-components'
import type { SwiperOptions } from 'swiper/types'

interface Props {
  block: BlockCard
}

const { block } = defineProps<Props>()

const getAssetType = (filename?: string | null) => storyblokAssetType(filename || '')
const columnSpan = computed(() => Number(block.column_end) - Number(block.column_start))

const swiperOptions: SwiperOptions = {
  effect: 'fade',
  loop: Boolean(block.media_new?.length),
  speed: 1000,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
}
</script>

<template>
  <div
    v-editable="block"
    data-component="block-card"
    class="wrapper md:grid md:grid-cols-(--app-grid) md:gap-(--app-inner-gutter)"
  >
    <div
      :class="[
        colStartMap[block.column_start],
        colEndMap[block.column_end],
      ]"
    >
      <StoryblokLink :item="block.link">
        <CardMedia
          :title="block.title"
          :headline="block.headline"
        >
          <template #media>
            <div class="overflow-hidden">
              <UiCarousel
                v-if="block.media_new"
                :slides="block.media_new"
                :navigation="false"
                :pagination="false"
                :options="swiperOptions"
              >
                <template #slide="{ slide }">
                  <template v-if="slide?.filename">
                    <MediaImage
                      v-if="getAssetType(slide.filename) === 'image'"
                      class="rounded-sm"
                      :asset="slide"
                      :ratio="block.ratio"
                      :sizes="`
                        100vw
                        sm:100vw
                        md:${Number(columnSpan) / 12 * 100}vw
                        3xl:${Number(columnSpan) / 12 * 1800}px
                      `"
                    />

                    <MediaVideo
                      v-else-if="getAssetType(slide.filename) === 'video'"
                      class="block-card__media"
                      :asset="slide"
                      :ratio="block.ratio"
                    />
                  </template>
                </template>
              </UiCarousel>
            </div>
          </template>
        </CardMedia>
      </StoryblokLink>
    </div>
  </div>
</template>
