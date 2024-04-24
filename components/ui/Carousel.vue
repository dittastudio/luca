<script lang="ts" setup>
import { useKeenSlider } from 'keen-slider/vue.es'

const isFocused = ref(false)
const opacities = ref<number[]>([])
const items = [
  { src: 'https://placehold.co/1600x900/000000/FFFFFF/png' },
  { src: 'https://placehold.co/1600x900/FFFFFF/000000/png' },
  { src: 'https://placehold.co/1600x900/000000/FFFFFF/png' },
  { src: 'https://placehold.co/1600x900/FFFFFF/000000/png' },
  { src: 'https://placehold.co/1600x900/000000/FFFFFF/png' },
]

const [container, slider] = useKeenSlider({
  slides: items.length,
  loop: true,
  defaultAnimation: {
    duration: 3000,
  },
  detailsChanged: (s) => {
    opacities.value = s.track.details.slides.map(slide => slide.portion)
  },
  renderMode: 'custom',
})

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
        v-for="(item, index) in items"
        :key="index"
        class="ui-carousel__slide keen-slider__slide"
        :style="{ opacity: opacities[index] }"
      >
        <img
          :src="item.src"
          alt="Slide"
        >
        <!-- <slot :item="item" /> -->
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.ui-carousel {
  &:focus {
    outline: none;
  }
}

.ui-carousel__container:not([data-keen-slider-disabled]) {
  touch-action: pan-y;
  user-select: none;

  position: relative;

  overflow: hidden;

  width: 100%;

  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;

  &[data-keen-slider-reverse] {
    flex-direction: row-reverse;
  }

  &[data-keen-slider-v] {
    flex-wrap: wrap;
  }
}

.ui-carousel__slide {
  width: 100%;
  height: 100%;
  min-height: 100%;

  &:not(:first-child) {
    position: absolute;
    top: 0;
  }

  & img {
    width: 100%;
    height: auto;
  }
}
</style>
