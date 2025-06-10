<script lang="ts" setup generic="T">
import type { SwiperOptions } from 'swiper/types'
import Swiper from 'swiper'
import { Autoplay, EffectFade, Keyboard, Navigation, Pagination } from 'swiper/modules'
import ArrowLeft from '@/assets/icons/arrow-left.svg'
import ArrowRight from '@/assets/icons/arrow-right.svg'

interface Props {
  slides: T[]
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
    grabCursor: true,
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
    :class="{
      'ui-carousel--next-prev-shadow': nextPrevShadow,
      'ui-carousel--has-pagination': pagination && slides?.length > 1,
    }"
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
    </div>

    <template v-if="slides?.length > 1">
      <button
        ref="prevEl"
        type="button"
        class="ui-carousel__button ui-carousel__button--previous"
      >
        <span class="sr-only">Previous</span>

        <ArrowLeft class="ui-carousel__arrow ui-carousel__arrow--left" />
      </button>

      <button
        ref="nextEl"
        type="button"
        class="ui-carousel__button ui-carousel__button--next"
      >
        <span class="sr-only">Next</span>

        <ArrowRight class="ui-carousel__arrow ui-carousel__arrow--right" />
      </button>
    </template>

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
  --dot-size: 8px;
  --pagination-height: calc(theme('spacing.30') + var(--dot-size));

  user-select: none;
  isolation: isolate;
  position: relative;
  height: inherit;
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

  .app-story & {
    background-color: theme('colors.offwhite');
  }
}

.ui-carousel__button {
  pointer-events: none;

  position: absolute;
  top: 0;

  display: flex;
  align-items: center;

  height: 100%;
  padding: var(--app-outer-gutter);

  opacity: 0;

  transition: opacity theme('transitionDuration.300') theme('transitionTimingFunction.smooth');

  .ui-carousel:hover & {
    pointer-events: auto;
    opacity: 0.5;
  }

  .ui-carousel:hover &:hover {
    opacity: 1;
  }

  .ui-carousel--next-prev-shadow &::before {
    pointer-events: none;
    content: '';

    position: absolute;
    top: 0;
    bottom: 0;

    width: 400px;
    height: 400px;
    margin: auto;

    background-image: radial-gradient(circle, rgb(0 0 0 / 50%) 0%, rgb(0 0 0 / 0%) 50%);
    background-repeat: no-repeat;
    background-size: contain;
  }

  &--previous {
    cursor: w-resize;
    left: 0;
    justify-content: start;

    .ui-carousel--next-prev-shadow &::before {
      left: 0;
      background-position: left -225px center;
    }
  }

  &--next {
    cursor: e-resize;
    right: 0;
    justify-content: end;

    .ui-carousel--next-prev-shadow &::before {
      right: 0;
      background-position: right -225px center;
    }
  }

  .ui-carousel--has-pagination & {
    height: calc(100% - var(--pagination-height));
  }

  @media not (hover: hover) {
    display: none;
  }
}

.ui-carousel__arrow {
  width: 22px;
  height: auto;
  fill: currentcolor;
  transition: transform theme('transitionDuration.300') theme('transitionTimingFunction.smooth');

  &--left {
    transform: translate3d(50%, 0, 0);
  }

  &--right {
    transform: translate3d(-50%, 0, 0);
  }

  .ui-carousel:hover & {
    transform: translate3d(0, 0, 0);
    transition: transform theme('transitionDuration.300') theme('transitionTimingFunction.out');
  }
}

.ui-carousel__pagination-wrapper {
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
