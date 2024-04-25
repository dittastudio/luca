<script lang="ts" setup>
import { ratioMap } from '@/utilities/maps'
import type { BlockCarouselStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockCarouselStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div class="block-carousel">
    <div class="block-carousel__grid wrapper">
      <div class="block-carousel__container">
        <UiCarousel
          :slides="block.slides"
          ratio="16:9"
        >
          <template #slide="{ slide }">
            <div class="block-carousel__slide">
              <div
                v-for="media in slide.media"
                :key="media._uid"
                class="block-carousel__item"
              >
                <NuxtImg
                  v-if="media.component === 'image' && media?.image"
                  class="block-carousel__image"
                  :class="slide.media.length === 1 ? ratioMap['16:9'] : ratioMap['8:9']"
                  provider="storyblok"
                  :src="media.image.filename"
                  :alt="media.image.alt"
                  :width="slide.media.length === 1 ? '16' : '8'"
                  height="9"
                  :sizes="slide.media.length === 1
                    ? `
                      100vw
                      md:${(10 / 12 * 100)}vw
                      3xl:${(10 / 12 * 1800)}px
                    `
                    :`
                      50vw
                      md:${(5 / 12 * 100)}vw
                      3xl:${(5 / 12 * 1800)}px
                    `
                  "
                  loading="lazy"
                />

                <MediaVideo
                  v-else-if="media.component === 'video' && media.video"
                  :asset="media.video"
                  :ratio="slide.media.length === 1 ? '16:9' : '8:9'"
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
.block-carousel {
  overflow: hidden;
}

.block-carousel__grid {
  @screen md {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: var(--app-inner-gutter);
  }
}

.block-carousel__container {
  @screen md {
    grid-column: 2 / span 10;
  }
}

.block-carousel__slide {
  display: flex;
  gap: var(--app-inner-gutter);
  height: 100%;
}

.block-carousel__item {
  flex-basis: 50%;
  flex-grow: 1;
}

.block-carousel__image {
  height: 100%;
  object-fit: cover;
  border-radius: theme('borderRadius.sm');
}
</style>
