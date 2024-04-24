<script lang="ts" setup generic="T">
import { useKeenSlider } from 'keen-slider/vue.es'
import config from '@/tailwind.config'

interface Props {
  slides: T[]
}

const { slides } = defineProps<Props>()

const { screens } = config.theme

const isFocused = ref(false)
const current = ref(0)
const opacities = ref<number[]>([])

const [container, slider] = useKeenSlider({
  slides: {
    number: slides.length,
    spacing: 20,
  },
  loop: true,
  defaultAnimation: {
    duration: 1000,
  },
  initial: current.value,
  slideChanged: (s) => {
    current.value = s.track.details.rel
  },

  breakpoints: {
    [`(min-width: ${screens.md})`]: {
      renderMode: 'custom',
      detailsChanged: (s) => {
        opacities.value = s.track.details.slides.map(slide => slide.portion)
      },
    },
  },
})

const dotHelper = computed(() => slider.value ? [...Array(slider.value.track.details.slides.length).keys()] : [])

const goToSlide = (action: 'prev' | 'next') => {
  if (slider.value) slider.value[action]()
}

const eventKeyboardFocus = () => {
  isFocused.value = true
}

const eventKeyboardBlur = () => {
  isFocused.value = false
}

const eventKeydown = (event: KeyboardEvent) => {
  if (!isFocused.value) return
  switch (event.key) {
    case 'Left':
    case 'ArrowLeft':
      goToSlide('prev')
      break
    case 'Right':
    case 'ArrowRight':
      goToSlide('next')
      break
    default:
      break
  }
}
</script>

<template>
  <div
    class="ui-carousel"
    tabindex="0"
    @keydown="eventKeydown"
    @focus="eventKeyboardFocus"
    @blur="eventKeyboardBlur"
  >
    <div
      ref="container"
      class="ui-carousel__container  keen-slider"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="ui-carousel__slide keen-slider__slide"
        :class="{ 'ui-carousel__slide--is-active': current === index }"
        :style="{ '--slide-opacity': opacities[index] }"
      >
        <slot
          name="slide"
          :slide="slide"
        />
      </div>
    </div>

    <div class="ui-carousel__dots">
      <button
        v-for="(_slide, index) in dotHelper"
        :key="index"
        class="ui-carousel__dot"
        :class="{ 'ui-carousel__dot--is-active': current === index }"
        @click="slider?.moveToIdx(index)"
        @focus="eventKeyboardFocus"
        @blur="eventKeyboardBlur"
      >
        <span class="ui-carousel__circle" />

        <span class="sr-only">Slide {{ index }}</span>
      </button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.ui-carousel {
  &:focus {
    outline: none;
  }
}

.ui-carousel__container:not([data-keen-slider-disabled]) {
  touch-action: pan-y;
  user-select: none;

  position: relative;

  aspect-ratio: 16 / 9;
  width: 100%;

  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;

  &[data-keen-slider-reverse] {
    flex-direction: row-reverse;
  }

  &[data-keen-slider-v] {
    flex-wrap: wrap;
  }

  @screen mdMax {
    display: flex;
  }

  @screen md {
    overflow: hidden;

  }
}

.ui-carousel__slide {
  pointer-events: none;
  width: 100%;
  height: 100%;
  min-height: 100%;

  @screen md {
    position: absolute;
    top: 0;
    opacity: var(--slide-opacity);
  }

  &--is-active {
    pointer-events: auto;
  }
}

.ui-carousel__dots {
  --dot-size: 8px;

  display: flex;
  justify-content: center;
  margin-block-start: calc(theme('spacing.30') - var(--dot-size));
}

.ui-carousel__dot {
  padding: calc(var(--dot-size) / 2);
}

.ui-carousel__circle {
  cursor: pointer;

  display: block;

  width: var(--dot-size);
  height: var(--dot-size);

  background-color: theme('colors.white/20%');
  border-radius: 50%;

  transition: background-color theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  .ui-carousel__dot--is-active & {
    background-color: currentcolor;
  }
}
</style>
