<script lang="ts" setup>
import { storyblokImageDimensions } from '@/utilities/helpers'
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
        <UiCarousel :slides="block.slides">
          <template #slide="{ slide }">
            <div class="block-carousel__slide">
              <div
                v-for="media in slide.media"
                :key="media._uid"
                class="block-carousel__item"
              >
                <NuxtImg
                  v-if="media.component === 'image' && media?.image"
                  :class="[ratioMap[media.ratio], 'object-cover']"
                  provider="storyblok"
                  :src="media.image.filename"
                  :alt="media.image.alt"
                  :width="storyblokImageDimensions(media.image.filename).width"
                  :height="storyblokImageDimensions(media.image.filename).height"
                  :sizes="`
                    100vw
                    sm:100vw
                    md:${(5 / 12 * 100)}vw
                    3xl:${(5 / 12 * 1800)}px
                  `"
                  loading="lazy"
                />

                <MediaVideo
                  v-else-if="media.component === 'video' && media.video"
                  :asset="media.video"
                />

                <!-- block.ratio -->
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

  /* TODO: To be refactored  */
  & video,
  & img {
    aspect-ratio: auto;
    height: 100%;
  }
}
</style>