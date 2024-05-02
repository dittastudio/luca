<script lang="ts" setup>
import type { SwiperOptions } from 'swiper/types'
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
2
const swiperOptions: SwiperOptions = {
  effect: 'fade',
  keyboard: {
    enabled: true,
  },
}
</script>

<template>
  <div class="block-gallery">
    <UiCarousel
      :ratio="'auto'"
      :slides="block.slides"
      :pagination="false"
      :options="swiperOptions"
      @current-slide="setCurrentSlide"
    >
      <template #slide="{ slide }">
        <div class="block-gallery__item wrapper">
          <div class="block-gallery__grid">
            <div class="block-gallery__inner">
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
          </div>
        </div>
      </template>
    </UiCarousel>

    <h5 class="block-gallery__caption type-body-large wrapper">
      <span v-if="block.slides?.length > 1">
        {{ currentSlide }} / {{ block.slides?.length }}
      </span>

      <span v-if="block.title">{{ block.title }}</span>
    </h5>
  </div>
</template>

<style lang="postcss">
.block-gallery {
  position: relative;
  overflow: hidden;
  height: 100vh;
  height: 100dvh;

  &::after {
    content: '';

    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;

    width: calc(100% - (var(--app-outer-gutter) * 2));
    margin-inline: auto;

    opacity: 0.2;
    border-block-end: 1px solid currentcolor;
  }
}

.block-gallery__item {
  height: inherit;
  padding-block: var(--app-header-height);
  background-color: theme('colors.offwhite');

  @screen md {
    padding-block: calc(var(--app-header-height) / 1.5);
  }
}

.block-gallery__grid {
  display: grid;
  height: inherit;

  @screen md {
    grid-template-columns: var(--app-grid);
    gap: var(--app-inner-gutter);
    justify-content: center;
  }
}

.block-gallery__inner {
  grid-column: 1 / -1;
  min-height: 100%;

  @screen md {
    grid-column: 3 / span 8;
  }
}

.block-gallery__caption {
  pointer-events: none;

  position: absolute;
  right: 0;
  bottom: theme('spacing.20');
  left: 0;

  display: flex;
  gap: theme('spacing.20');

  @screen md {
    bottom: theme('spacing.50');
    gap: theme('spacing.40');
  }
}

.block-gallery__media {
  height: 100%;
  object-fit: contain;
  border-radius: theme('borderRadius.sm');
}
</style>
