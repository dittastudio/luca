<script lang="ts" setup>
import { storyblokAssetType, storyblokImageDimensions } from '@/utilities/helpers'
import type { BlockGalleryStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockGalleryStoryblok
}

const { block } = defineProps<Props>()

const currentSlide = ref(1)

const setCurrentSlide = (slide: number) => {
  currentSlide.value = slide
}
</script>

<template>
  <div class="block-gallery">
    <div class="block-gallery__container wrapper">
      <div class="block-gallery__grid">
        <div class="block-gallery__inner">
          <UiCarousel
            :slides="block.slides"
            :ratio="'auto'"
            :loop="false"
            :pagination="false"
            @current-slide="setCurrentSlide"
          >
            <template #slide="{ slide }">
              <div class="block-gallery__item">
                <NuxtImg
                  v-if="slide && storyblokAssetType(slide.filename) === 'image'"
                  class="block-gallery__media"
                  provider="storyblok"
                  :src="slide.filename"
                  :alt="slide.alt"
                  :width="storyblokImageDimensions(slide.filename).width"
                  :height="storyblokImageDimensions(slide.filename).height"
                  :sizes="`
                      100vw
                      md:${8 / 12 * 100}vw
                      3xl:${8 / 12 * 1800}px
                    `"
                />

                <MediaVideo
                  v-else-if="slide && storyblokAssetType(slide.filename) === 'video'"
                  :asset="slide"
                  class="block-gallery__media"
                />
              </div>
            </template>
          </UiCarousel>
        </div>

        <h5 class="block-gallery__caption type-body-large">
          <span v-if="block.slides?.length > 1">
            {{ currentSlide }} / {{ block.slides?.length }}
          </span>

          <span v-if="block.title">{{ block.title }}</span>
        </h5>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.block-gallery {
  overflow: hidden;
}

.block-gallery__grid {
  position: relative;
  display: grid;
  grid-template-columns: theme('spacing.20') repeat(3, minmax(0, 1fr)) theme('spacing.20');
  justify-content: center;

  &::after {
    content: '';

    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;

    border-block-end: 1px solid currentcolor;
  }

  @screen md {
    grid-template-columns: var(--app-grid);
    gap: var(--app-inner-gutter);
  }
}

.block-gallery__inner {
  grid-column: 2 / span 3;
  height: 100vh;

  @screen md {
    grid-column: 3 / span 8;
  }
}

.block-gallery__caption {
  position: absolute;
  bottom: theme('spacing.20');
  left: 0;

  display: flex;
  gap: theme('spacing.20');

  @screen md {
    bottom: theme('spacing.50');
    gap: theme('spacing.40');
  }
}

.block-gallery__item {
  height: 100%;
  padding-block: var(--app-header-height);

  @screen md {
    padding-block: calc(var(--app-header-height) / 1.5);
  }
}

.block-gallery__media {
  height: 100%;
  object-fit: contain;
  border-radius: theme('borderRadius.sm');
}
</style>
