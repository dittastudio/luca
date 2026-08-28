<script lang="ts" setup>
import type { SwiperOptions } from 'swiper/types'
import type { BlockGallery } from '#storyblok-components'

interface Props {
  block: BlockGallery
}

const { block } = defineProps<Props>()
const currentSlide = ref(1)
const muted = ref(true)

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
      <template #slide="{ slide, index }">
        <div
          class="
            wrapper
            h-full
            py-(--app-header-height)
            bg-(--app-background-color)
            md:pt-[calc(var(--app-header-height)/1.5)]
            md:pb-[calc(var(--app-header-height)*0.85)]
          "
        >
          <div class="h-[inherit] flex flex-col items-center">
            <div
              v-if="slide?.media?.filename"
              class="h-full"
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

              <UiMuteToggle
                v-else-if="storyblokAssetType(slide.media.filename) === 'video'"
                :muted="muted"
                @toggle="muted = !muted"
              >
                <MediaVideo
                  :asset="slide.media"
                  :muted="muted"
                  :active="currentSlide === index + 1"
                  class="block-gallery__media rounded-xs"
                />
              </UiMuteToggle>
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
@reference "@/assets/css/app.css";

.block-gallery {
  .app-story & {
    --app-background-color: var(--color-offwhite);
  }

  & img,
  & video {
    width: auto!important;
    height: 100%!important;
    margin: 0 auto;
    /* object-fit: contain; */
  }
}
</style>
