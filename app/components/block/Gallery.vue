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
    class="
      block-gallery
      relative
      overflow-hidden
      h-dvh
      after:absolute
      after:right-0
      after:bottom-0
      after:left-0
      after:w-[calc(100%-var(--app-outer-gutter)*2)]
      after:mx-auto
      after:opacity-20
      after:border-b
      after:border-current
    "
  >
    <UiCarousel
      v-if="block.items"
      :slides="block.items"
      :pagination="false"
      :options="swiperOptions"
      @current-slide="setCurrentSlide"
    >
      <template #slide="{ slide }">
        <div
          class="
            wrapper
            h-full
            py-(--app-header-height)
            bg-(--app-background-color)
            md:py-[calc(var(--app-header-height)/1.5)]
          "
        >
          <div class="block-gallery__grid h-[inherit] md:grid-cols-(--app-grid) md:gap-(--app-inner-gutter) md:justify-center">
            <div
              v-if="slide?.media?.filename"
              class="block-gallery__inner col-span-full min-h-full h-full md:col-start-3 md:col-span-8"
            >
              <MediaImage
                v-if="storyblokAssetType(slide.media.filename) === 'image'"
                class="block-gallery__media rounded-xs"
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
                class="block-gallery__media rounded-xs"
              />
            </div>
          </div>
        </div>
      </template>
    </UiCarousel>

    <h5
      v-if="block.items"
      class="
        type-body-large
        wrapper
        py-(--app-outer-gutter)
        absolute
        right-0
        bottom-0
        left-0
        flex
        gap-4
        bg-(--app-background-color)
        md:gap-8
      "
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

<style>
@reference "@/assets/css/main.css";

.block-gallery {
  .app-story & {
    --app-background-color: var(--color-offwhite);
  }

  & img {
    object-fit: contain;
  }
}
</style>
