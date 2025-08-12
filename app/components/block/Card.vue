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
    class="block-card wrapper"
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
                :ratio="block.ratio"
                :slides="block.media_new"
                :navigation="false"
                :pagination="false"
                :options="swiperOptions"
              >
                <template #slide="{ slide }">
                  <div
                    v-if="slide?.filename"
                    class="block-card__inner"
                  >
                    <MediaImage
                      v-if="getAssetType(slide.filename) === 'image'"
                      class="block-card__media"
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
                  </div>
                </template>
              </UiCarousel>
            </div>
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
    grid-template-columns: var(--app-grid);
    gap: var(--app-inner-gutter);
  }
}

.block-card__media {
  border-radius: theme('borderRadius.sm');
}
</style>
