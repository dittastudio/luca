<script lang="ts" setup generic="T">
import Swiper from 'swiper'
import type { SwiperOptions } from 'swiper/types'
import { Autoplay, EffectFade, Keyboard, Navigation, Pagination } from 'swiper/modules'
import type { SlideStoryblok } from '@/types/storyblok'
import { wait } from '@/utilities/helpers'
import ArrowLeft from '@/assets/icons/arrow-left.svg'
import ArrowRight from '@/assets/icons/arrow-right.svg'

interface Props {
  slides: SlideStoryblok[]
  pagination?: boolean
  options?: SwiperOptions
  nextPrevShadow?: boolean
}

const { slides, pagination = true, options, nextPrevShadow = false } = defineProps<Props>()

interface Emits {
  (event: 'current-slide', payload: number): void
}

const emit = defineEmits<Emits>()
const swiper = ref<Swiper>()
const swiperEl = ref<HTMLDivElement | null>(null)
const prevEl = ref<HTMLButtonElement | null>(null)
const nextEl = ref<HTMLButtonElement | null>(null)
const paginationEl = ref<HTMLDivElement | null>(null)
const currentSlidesPerView = 1

const updatePagination = (swiper: Swiper) => {
  if (swiper.realIndex < (slides.length - (currentSlidesPerView + 1))) {
    const bulletSize = 16
    const position = swiper.realIndex < 3 ? 0 : -Math.abs(bulletSize * (swiper.realIndex - 2))

    paginationEl.value?.style.setProperty('--bullet-movement', `${position}px`)
  }
}

const initSwiper = () => {
  if (!swiperEl.value) {
    return
  }

  swiper.value = new Swiper(swiperEl.value, {
    modules: [Autoplay, EffectFade, Keyboard, Navigation, Pagination],
    enabled: slides && slides.length > 1,
    speed: 500,
    navigation: {
      nextEl: nextEl.value,
      prevEl: prevEl.value,
    },
    pagination: pagination
      ? {
          el: paginationEl.value,
          clickable: true,
          bulletClass: 'ui-carousel__bullet',
          bulletActiveClass: 'ui-carousel__bullet--is-active',
          renderBullet(_, className) {
            return `
              <button type="button" class="${className}">
                <span class="ui-carousel__dot"></span>
              </button>
            `
          },
        }
      : false,
    on: {
      init: (slider) => {
        emit('current-slide', slider.realIndex + 1)
        updatePagination(slider)
      },
      slideChange: (slider) => {
        emit('current-slide', slider.realIndex + 1)
        updatePagination(slider)
      },
    },
    ...options,
  })
}

onMounted(async () => {
  await wait(1000)

  initSwiper()
})

onUnmounted(() => swiper.value?.destroy())

watch(
  () => slides,
  () => {
    swiper.value?.update()
    swiper.value?.updateSlides()
  },
)

watch(() => options, () => {
  if (!swiper.value) {
    return
  }

  if (typeof options?.autoplay === 'boolean' && !options?.autoplay) {
    swiper.value.autoplay.pause()
  }
  else if (typeof options?.autoplay === 'object') {
    swiper.value.autoplay.start()
  }
})
</script>

<template>
  <div
    ref="swiperEl"
    class="ui-carousel swiper"
    :class="{ 'ui-carousel--next-prev-shadow': nextPrevShadow }"
  >
    <div class="ui-carousel__wrapper swiper-wrapper">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="ui-carousel__slide swiper-slide"
      >
        <slot
          name="slide"
          :slide="slide"
        />
      </div>

      <template v-if="slides?.length > 1">
        <button ref="prevEl" type="button" class="ui-carousel__button ui-carousel__button--previous">
          <span class="sr-only">Previous</span>

          <ArrowLeft class="ui-carousel__arrow ui-carousel__arrow--left" />
        </button>

        <button ref="nextEl" type="button" class="ui-carousel__button ui-carousel__button--next">
          <span class="sr-only">Next</span>

          <ArrowRight class="ui-carousel__arrow ui-carousel__arrow--right" />
        </button>
      </template>
    </div>

    <div
      v-if="pagination && slides?.length > 1"
      class="ui-carousel__pagination-wrapper"
    >
      <div
        ref="paginationEl"
        class="ui-carousel__pagination swiper-pagination"
        :class="{ 'justify-center': pagination && slides?.length < 5 }"
      />
    </div>
  </div>
</template>

<style lang="postcss">
.ui-carousel {
  user-select: none;
  position: relative;
  height: inherit;

  @media (hover: hover) {
    &:hover {
      .ui-carousel__button {
        pointer-events: auto;
      }
    }
  }
}

.ui-carousel__wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  transition-timing-function: theme('transitionTimingFunction.out');
  transition-property: transform;
}

.ui-carousel__slide {
  touch-action: pan-y pinch-zoom;
  flex-shrink: 0;
  width: 100%;
  background-color: var(--app-background-color);
  transition-property: transform;
}

.ui-carousel__button {
  pointer-events: none;
  position: absolute;
  z-index: 1;
  top: 0;
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  padding: var(--app-outer-gutter);
  opacity: 0;
  background-color: transparent;
  background-repeat: no-repeat;
  transition: opacity theme('transitionDuration.500') theme('transitionTimingFunction.out');

  &:hover {
    opacity: 1;

    .ui-carousel__arrow--left,
    .ui-carousel__arrow--right {
      transform: translate3d(0, 0, 0);
    }
  }

  &--previous {
    left: 0;
    justify-content: start;

    .ui-carousel--next-prev-shadow & {
      background-image: radial-gradient(circle, rgb(0 0 0 / 50%) 0%, rgb(0 0 0 / 0%) 50%);
      background-position: -200px 50%;
    }
  }

  &--next {
    right: 0;
    justify-content: end;

    .ui-carousel--next-prev-shadow & {
      background-image: radial-gradient(circle, rgb(0 0 0 / 50%) 0%, rgb(0 0 0 / 0%) 50%);
      background-position: 200px 50%;
    }
  }
}

.ui-carousel__arrow {
  width: 22px;
  height: auto;
  fill: currentcolor;
  transition: transform theme('transitionDuration.500') theme('transitionTimingFunction.out');

  &--left {
    transform: translate3d(100%, 0, 0);
  }

  &--right {
    transform: translate3d(-100%, 0, 0);
  }
}

.ui-carousel__pagination-wrapper {
  --dot-size: 8px;

  position: relative;
  overflow: hidden;
  width: calc(var(--dot-size) * 11);
  margin-block-start: calc(theme('spacing.30') - var(--dot-size));
  margin-inline: auto;
  padding-inline: 4px;

  &::before,
  &::after {
    pointer-events: none;
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    width: var(--dot-size);
    height: 100%;
  }

  &::before {
    left: 0;
    background-image: linear-gradient(to left, transparent, var(--app-background-color));
  }

  &::after {
    right: 0;
    background-image: linear-gradient(to right, transparent, var(--app-background-color));
  }
}

.ui-carousel__pagination {
  will-change: transform;
  transform: translateX(var(--bullet-movement)) translateZ(0);
  display: flex;
  transition: transform theme('transitionDuration.500') theme('transitionTimingFunction.out');
}

.ui-carousel__bullet {
  padding: calc(var(--dot-size) / 2);
}

.ui-carousel__dot {
  cursor: pointer;
  display: block;
  width: var(--dot-size);
  height: var(--dot-size);
  opacity: 0.2;
  background-color: currentcolor;
  border-radius: 50%;
  transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  .ui-carousel__bullet--is-active & {
    opacity: 1;
  }
}

.swiper-android .swiper-slide,
.swiper-ios .swiper-slide,
.swiper-wrapper {
  transform: translate3d(0, 0, 0);
}

.swiper-fade .swiper-slide {
  pointer-events: none;
  transition-property: opacity;
}

.swiper-fade .swiper-slide-active {
  pointer-events: auto;
}
</style>
