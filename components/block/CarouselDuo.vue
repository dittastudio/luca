<script lang="ts" setup>
// import type { BlockButtonStoryblok } from '@/types/storyblok'

// interface Props {
//   block: BlockButtonStoryblok
// }

// const { block } = defineProps<Props>()
const slides = [
  { src: 'https://placehold.co/700x800/000000/FFFFFF/png' },
  { src: 'https://placehold.co/700x800/FFFFFF/000000/png' },
  { src: 'https://placehold.co/700x800/000000/FFFFFF/png' },
  { src: 'https://placehold.co/700x800/FFFFFF/000000/png' },
  { src: 'https://placehold.co/700x800/000000/FFFFFF/png' },
  { src: 'https://placehold.co/700x800/FFFFFF/000000/png' },
]
</script>

<template>
  <div
    class="block-carousel-duo"
  >
    <div class="block-carousel-duo__grid wrapper">
      <div class="block-carousel-duo__container">
        <UiCarousel :slides="slides">
          <template #slide="{ slide }">
            <div class="block-carousel-duo__slide">
              <div class="block-carousel-duo__item">
                <img
                  :src="slide.src"
                  alt="Slide"
                  class="aspect-[7/8] h-full object-cover"
                >
              </div>

              <div class="block-carousel-duo__item">
                <img
                  :src="slide.src"
                  alt="Slide"
                  class="aspect-[7/8] h-full object-cover"
                >
              </div>
            </div>
          </template>
        </UiCarousel>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.block-carousel-duo {
  overflow: hidden;
}

.block-carousel-duo__grid {
  @screen md {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: var(--app-inner-gutter);
  }
}

.block-carousel-duo__container {
  @screen md {
    grid-column: 2 / span 10;
  }
}

.block-carousel-duo__slide {
  display: flex;
  gap: var(--app-inner-gutter);
}

.block-carousel-duo__item {
  flex-grow: 1;
}
</style>
