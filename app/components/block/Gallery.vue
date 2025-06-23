<script lang="ts" setup>
import type { BlockGallery } from '@@/.storyblok/types/285210/storyblok-components'
import type { SwiperOptions } from 'swiper/types'

interface Props {
  block: BlockGallery
}

const { block } = defineProps<Props>()
const currentSlide = ref(1)

const setCurrentSlide = (slide: number) => {
  currentSlide.value = slide
}

const swiperOptions: SwiperOptions = {
  effect: 'fade',
  loop: Boolean(block.items?.length),
  keyboard: {
    enabled: true,
  },
}
</script>

<template>
  <div
    v-editable="block"
    class="block-gallery"
  >
    <UiCarousel
      v-if="block.items"
      ratio="auto"
      :slides="block.items"
      :pagination="false"
      :options="swiperOptions"
      @current-slide="setCurrentSlide"
    >
      <template #slide="{ slide }">
        <div class="block-gallery__item wrapper">
          <div class="block-gallery__grid">
            <div
              v-if="slide?.media?.filename"
              class="block-gallery__inner"
            >
              <MediaImage
                v-if="storyblokAssetType(slide.media.filename) === 'image'"
                class="block-gallery__media"
                :asset="slide.media"
                sizes="
                  100vw
                  md:50vw
                  lg:50vw
                  xl:50vw
                  2xl:50vw
                  3xl:50vw
                "
              />

              <MediaVideo
                v-else-if="storyblokAssetType(slide.media.filename) === 'video'"
                :asset="slide.media"
                class="block-gallery__media"
              />
            </div>
          </div>
        </div>
      </template>
    </UiCarousel>

    <h5
      v-if="block.items"
      class="block-gallery__caption type-body-large wrapper"
    >
      <span
        v-if="block.items?.length > 1"
        class="shrink-0"
      >
        {{ currentSlide }} / {{ block.items?.length }}
      </span>

      <span v-if="block.items?.[currentSlide - 1]?.caption">
        {{ block.items?.[currentSlide - 1]?.caption }}
      </span>
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

  & .ui-carousel__slide {
    height: 100%;
  }
}

.block-gallery__item {
  height: inherit;
  padding-block: var(--app-header-height);
  background-color: var(--app-background-color);

  .app-story & {
    background-color: theme('colors.offwhite');
  }

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
  /* TODO: Remove this once the image is fixed */
  height: 100% !important;
  object-fit: contain;

  & img {
    height: 100% !important;
    object-fit: contain;
  }
}
</style>
