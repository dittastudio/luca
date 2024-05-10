<script lang="ts" setup>
import type { SwiperOptions } from 'swiper/types'
import { useIntersectionObserver } from '@vueuse/core'
import type { BlockCarouselStoryblok } from '@/types/storyblok'
import { arrayToTuples } from '@/utilities/helpers'
import { storyblokAssetType } from '@/utilities/storyblok'

interface Props {
  block: BlockCarouselStoryblok
}

const { block } = defineProps<Props>()

const isVisible = ref(false)
const container = ref<HTMLDivElement | null>(null)

useIntersectionObserver(
  container,
  ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting
  },
  { rootMargin: '0px 0px 0px 0px', threshold: 0.25 },
)

const swiperOptions = computed<SwiperOptions>(() => ({
  effect: 'fade',
  loop: true,
  autoplay: block.autoplay && isVisible.value ? { delay: 3000, pauseOnMouseEnter: true } : false,
  keyboard: {
    enabled: true,
  },
}))

const slides = computed(() => block.two_per_slide ? arrayToTuples(block.slides || []) : block.slides?.map(item => [item]))
</script>

<template>
  <div
    v-editable="block"
    class="block-carousel"
  >
    <div class="block-carousel__grid wrapper">
      <div ref="container" class="block-carousel__container">
        <UiCarousel
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
                <MediaImage
                  v-if="media && storyblokAssetType(media.filename) === 'image'"
                  class="block-carousel__media"
                  :asset="media"
                  :ratio="block.ratio"
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
                />

                <MediaVideo
                  v-else-if="media.media && storyblokAssetType(media.filename) === 'video'"
                  class="block-carousel__media"
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

.block-carousel__media {
  height: 100%;
  object-fit: cover;
  border-radius: theme('borderRadius.sm');
}
</style>
