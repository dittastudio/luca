<script lang="ts" setup>
import { useKeenSlider } from 'keen-slider/vue'

const isFocused = ref(false)

const [container, slider] = useKeenSlider({ loop: true }, [
  // add plugins here
])

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
      <div class="ui-carousel__slide keen-slider__slide">
        <img
          src="https://placehold.co/1600x900/000000/FFFFFF/png"
          alt=""
        >
      </div>

      <div class="ui-carousel__slide keen-slider__slide">
        <img
          src="https://placehold.co/1600x900/FFFFFF/000000/png"
          alt=""
        >
      </div>

      <div class="ui-carousel__slide keen-slider__slide">
        <img
          src="https://placehold.co/1600x900/000000/FFFFFF/png"
          alt=""
        >
      </div>

      <div class="ui-carousel__slide keen-slider__slide">
        <img
          src="https://placehold.co/1600x900/FFFFFF/000000/png"
          alt=""
        >
      </div>

      <div class="ui-carousel__slide keen-slider__slide">
        <img
          src="https://placehold.co/1600x900/000000/FFFFFF/png"
          alt=""
        >
      </div>

      <div class="ui-carousel__slide keen-slider__slide">
        <img
          src="https://placehold.co/1600x900/FFFFFF/000000/png"
          alt=""
        >
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
  display: flex;
  align-content: flex-start;

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
  position: relative;

  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: 100%;
}
</style>
