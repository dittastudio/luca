<script lang="ts" setup generic="T">
import Swiper from 'swiper'
import type { SwiperOptions } from 'swiper/types'
import { Autoplay, EffectFade, Keyboard, Pagination } from 'swiper/modules'

type ArrayOrWrappedInArray<T> = T extends (infer _)[] ? T : T[]

interface Props {
  slides: ArrayOrWrappedInArray<T>
  pagination?: boolean
  options?: SwiperOptions
}

const { slides, pagination = true, options } = defineProps<Props>()

interface Emits {
  (event: 'current-slide', payload: number): void
}

const emit = defineEmits<Emits>()

const swiper = ref<Swiper>()
const swiperEl = ref<any>()
const current = ref(0)

const initSwiper = () => {
  swiper.value = new Swiper(swiperEl.value, {
    modules: [Autoplay, EffectFade, Pagination, Keyboard],
    enabled: slides.length > 1,
    speed: 500,
    navigation: {
      nextEl: '.ui-carousel__button--next',
      prevEl: '.ui-carousel__button--prev',
    },
    pagination: pagination
      ? {
          el: '.ui-carousel__pagination',
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
    slideToClickedSlide: true,
    observeSlideChildren: true,
    on: {
      init: (slider) => {
        current.value = slider.activeIndex + 1
        emit('current-slide', current.value)
      },
      slideChange: (slider) => {
        current.value = slider.activeIndex + 1
        emit('current-slide', current.value)
      },
    },
    ...options,
  })
}

onMounted(() => initSwiper())

onUnmounted(() => swiper.value?.destroy())

watch(() => slides, () => {
  swiper.value?.update()
  swiper.value?.updateSlides()
})
</script>

<template>
  <div
    ref="swiperEl"
    class="ui-carousel swiper"
  >
    <div class="ui-carousel__wrapper swiper-wrapper">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="ui-carousel__slide swiper-slide"
        @click="swiper?.slideNext()"
      >
        <slot
          name="slide"
          :slide="slide"
        />
      </div>
    </div>

    <div
      v-if="slides.length > 1 && pagination"
      class="ui-carousel__pagination"
    />
  </div>
</template>

<style lang="postcss">
.ui-carousel {
  user-select: none;
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
  height: 100%;

  transition-property: transform;
}

.ui-carousel__pagination {
  --dot-size: 8px;

  display: flex;
  justify-content: center;
  min-height: calc(var(--dot-size) * 2);
  margin-block-start: calc(theme('spacing.30') - var(--dot-size));
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
