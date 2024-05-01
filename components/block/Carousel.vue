<script lang="ts" setup>
import type { SwiperOptions } from 'swiper/types'
import { ratioMap } from '@/utilities/maps'
import { storyblokAssetType } from '@/utilities/helpers'
import type { BlockCarouselStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockCarouselStoryblok
}

const { block } = defineProps<Props>()

const swiperOptions: SwiperOptions = {
  effect: 'fade',
  loop: true,
  autoplay: block.autoplay ? { delay: 3000 } : false,
  keyboard: {
    enabled: true,
  },
}

const splitArrayIntoTuples = (imageArray: any) => {
  const tuples = []

  if (block.two_per_slide) {
    for (let i = 0; i < imageArray.length; i += 2) {
      if (i + 1 < imageArray.length) {
        tuples.push([imageArray[i], imageArray[i + 1]])
      }
      else {
        tuples.push([imageArray[i]])
      }
    }
  }
  else {
    for (let i = 0; i < imageArray.length; i += 1) {
      tuples.push([imageArray[i]])
    }
  }
  return tuples
}

const slides = splitArrayIntoTuples(block.slides)
</script>

<template>
  <div class="block-carousel">
    <div class="block-carousel__grid wrapper">
      <div class="block-carousel__container">
        <UiCarousel
          ratio="16:9"
          :slides="slides"
          :options="swiperOptions"
        >
          <template #slide="{ slide }">
            <div class="block-carousel__slide">
              <div
                v-for="media in slide"
                :key="media._uid"
                class="block-carousel__item"
                :class="block.two_per_slide ? 'block-carousel__item--two' : 'block-carousel__item--one'"
              >
                <NuxtImg
                  v-if="media && storyblokAssetType(media.filename) === 'image'"
                  class="block-carousel__image"
                  :class="block.two_per_slide ? ratioMap['8:9'] : ratioMap['16:9']"
                  provider="storyblok"
                  :src="media.filename"
                  :alt="media.alt"
                  :width="block.two_per_slide ? '8' : '16'"
                  height="9"
                  :sizes="
                    block.two_per_slide ? `
                      50vw
                      md:${(5 / 12 * 100)}vw
                      3xl:${(5 / 12 * 1800)}px
                    ` : `
                      100vw
                      md:${(10 / 12 * 100)}vw
                      3xl:${(10 / 12 * 1800)}px
                    `
                  "
                  loading="lazy"
                />

                <MediaVideo
                  v-else-if="media.media && storyblokAssetType(media.filename) === 'video'"
                  :asset="media.video"
                  :ratio="block.two_per_slide ? '8:9' : '16:9'"
                />
              </div>
            </div>
          </template>
        </UiCarousel>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.block-carousel__grid {
  @screen md {
    display: grid;
    grid-template-columns: var(--app-grid);
    gap: var(--app-inner-gutter);
  }
}

.block-carousel__container {
  overflow: hidden;

  @screen md {
    grid-column: 2 / span 10;
  }
}

.block-carousel__slide {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--app-background-color);
}

.block-carousel__item {
  &--one {
    width: 100%;
  }

  &--two {
    width: calc(50% - (var(--app-inner-gutter) / 2));
  }
}

.block-carousel__image {
  height: 100%;
  object-fit: cover;
  border-radius: theme('borderRadius.sm');
}
</style>
