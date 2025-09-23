<script lang="ts" setup>
import type { BlockCarousel, Slide } from '@@/.storyblok/types/285210/storyblok-components'
import type { SwiperOptions } from 'swiper/types'
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  block: BlockCarousel
}

const { block } = defineProps<Props>()
const isVisible = ref(false)
const container = ref<HTMLDivElement | null>(null)

useIntersectionObserver(
  container,
  ([target]) => {
    if (!target) {
      return
    }

    isVisible.value = target.isIntersecting
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

const slides = computed(() => block.two_per_slide ? arrayToTuples<Slide>(block.items) : block.items?.map(item => [item]))
</script>

<template>
  <div
    v-editable="block"
    class="block-carousel"
  >
    <div class="wrapper md:grid md:grid-cols-(--app-grid) md:gap-(--app-inner-gutter)">
      <div
        ref="container"
        class="md:col-start-2 md:col-span-10 overflow-hidden"
      >
        <UiCarousel
          :slides="slides"
          :options="swiperOptions"
          :next-prev-shadow="true"
        >
          <template #slide="{ slide }">
            <div class="flex justify-between h-full bg-(--app-background-color)">
              <div
                v-for="(item, index) in slide"
                :key="index"
                class="block-carousel__item"
                :class="block.two_per_slide ? 'w-[calc(50%-var(--app-inner-gutter)/2)]' : 'w-full'"
              >
                <MediaImage
                  v-if="item?.media?.filename && storyblokAssetType(item.media.filename) === 'image'"
                  class="h-full object-cover rounded-xs"
                  :asset="item.media"
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
                  v-else-if="item?.media?.filename && storyblokAssetType(item.media.filename) === 'video'"
                  class="h-full object-cover rounded-xs"
                  :asset="item.media.video"
                  :ratio="block.two_per_slide ? '8:9' : '16:9'"
                />

                <p
                  v-if="item && item.caption"
                  class="type-body italic mt-1"
                >
                  {{ item.caption }}
                </p>
              </div>
            </div>
          </template>
        </UiCarousel>
      </div>
    </div>
  </div>
</template>
