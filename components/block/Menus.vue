<script lang="ts" setup>
import type { BlockMenusStoryblok } from '@/types/storyblok'
import { storyblokImageDimensions } from '@/utilities/helpers'

const activeIndex = ref(0)

const menuItems = [
  {
    _uid: 'a',
    title: 'Dining Room',
    images: [
      'https://placehold.co/600x840/000/FFF',
      'https://placehold.co/600x840/FFF/000',
      'https://placehold.co/600x840/000/FFF',
      'https://placehold.co/600x840/FFF/000',
    ],
    link: 'https://google.com',
  },
  {
    _uid: 'b',
    title: 'Bar Dining',
    images: [
      'https://placehold.co/600x840/F00/FFF',
      'https://placehold.co/600x840/FFF/F00',
      'https://placehold.co/600x840/F00/FFF',
      'https://placehold.co/600x840/FFF/F00',
    ],
    link: 'https://google.com',
  },
  {
    _uid: 'c',
    title: 'Desserts',
    images: [
      'https://placehold.co/600x840/000/FFF',
      'https://placehold.co/600x840/FFF/000',
    ],
    link: 'https://google.com',
  },
  {
    _uid: 'd',
    title: 'Drinks',
    images: [
      'https://placehold.co/600x840/000/FFF',
      'https://placehold.co/600x840/FFF/000',
    ],
    link: 'https://google.com',
  },
  {
    _uid: 'e',
    title: 'Wine List',
    images: [
      'https://placehold.co/600x840/000/FFF',
      'https://placehold.co/600x840/FFF/000',
    ],
    link: 'https://google.com',
  },
  {
    _uid: 'f',
    title: 'Private Dining',
    images: [
      'https://placehold.co/600x840/000/FFF',
      'https://placehold.co/600x840/FFF/000',
    ],
    link: 'https://google.com',
  },
]

interface Props {
  block: BlockMenusStoryblok
}

const { block } = defineProps<Props>()

console.log(block.menus?.[0].images)
</script>

<template>
  <div
    class="ui-menus wrapper"
  >
    <div class="ui-menus__grid">
      <nav class="ui-menus__nav">
        <div
          v-for="(menu, index) in block.menus"
          :key="menu._uid"
          class="ui-menus__nav-item"
        >
          <input
            :id="`menus-${menu._uid}`"
            class="ui-menus__radio"
            name="menus"
            type="radio"
            :checked="activeIndex === index"
            @change="activeIndex = index"
          >

          <label
            :for="`menus-${menu._uid}`"
            class="ui-menus__label type-body-large"
            :class="{ 'ui-menus__label--is-active': activeIndex === index }"
            :data-title="menu.title"
          >

            {{ menu.title }}
          </label>
        </div>
      </nav>

      <div class="ui-menus__main">
        <template
          v-for="(menu, index) in block.menus"
          :key="menu._uid"
        >
          <div
            class="ui-menus__item"
            :class="{ 'ui-menus__item--is-active': activeIndex === index }"
          >
            <h1
              class="ui-menus__title type-body-large"
            >
              {{ menu.title }}
            </h1>

            <div
              class="ui-menus__paper"
            >
              <UiCarousel
                :slides="menu.images"
                ratio="2:3"
                :loop="false"
              >
                <template #slide="{ slide }">
                  <NuxtImg
                    class="block-menus__image rounded-sm w-full h-full object-cover"
                    provider="storyblok"
                    :src="slide.filename"
                    :alt="slide.alt"
                    :width="storyblokImageDimensions(slide.filename).width"
                    :height="storyblokImageDimensions(slide.filename).height"
                    :sizes="`
                      100vw
                      md:${6 / 12 * 100}vw
                      lg:${4 / 12 * 100}vw
                      3xl:${4 / 12 * 1800}px
                    `"
                  />

                  <!-- <NuxtImg
                    class="block-card__image"
                    provider="storyblok"
                    :src="block.media.filename"
                    :alt="block.media.alt"
                    :width="ratioDimensions(block.ratio).width"
                    :height="ratioDimensions(block.ratio).height"
                    :sizes="`
                      100vw
                      sm:100vw
                      md:${Number(block.column_span) / 12 * 100}vw
                      3xl:${Number(block.column_span) / 12 * 1800}px
                    `"
                    loading="lazy"
                  /> -->
                </template>
              </UiCarousel>
            </div>

            <div
              class="ui-menus__download"
            >
              <NuxtLink
                :to="menu.pdf.filename"
                target="_blank"
              >
                <AppearanceButton type="green">
                  Download
                </AppearanceButton>
              </NuxtLink>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.ui-menus {
  position: relative;
  overflow: hidden;

  @screen md {
    display: flex;
    min-height: 100vh;
  }
}

.ui-menus__grid {
  display: grid;
  grid-template-columns: theme('spacing.40') repeat(3, minmax(0, 1fr)) theme('spacing.40');
  align-items: center;
  justify-content: center;

  width: 100%;

  text-align: center;

  @screen md {
    display: grid;
    grid-template-columns: var(--app-grid);
    gap: var(--app-inner-gutter);
    align-items: center;
    justify-content: center;
  }
}

.ui-menus__nav {
  display: flex;
  grid-column: 1 / span 3;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @screen mdMax {
    display: none;
  }
}

.ui-menus__nav-item {
  position: relative;
  width: 100%;
}

.ui-menus__radio {
  pointer-events: none;

  position: absolute;
  top: 0;
  left: 0;

  opacity: 0;
}

.ui-menus__label {
  --link-padding-x: theme('spacing.10');
  --link-padding-y: 3px;

  cursor: pointer;

  position: relative;

  display: block;

  width: 100%;
  padding-block: var(--link-padding-y);
  padding-inline: var(--link-padding-x);

  text-align: left;

  transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  /* HACK: Added to stop hover stutter with italics 🤪 */
  &::after {
    pointer-events: none;
    content: attr(data-title);

    overflow: hidden;
    display: block;

    height: 0;

    font-style: normal;

    visibility: hidden;
    opacity: 0;
  }

  .ui-menus__nav:hover .ui-menus__radio:not(:checked) + &:not(:hover),
  .ui-menus__nav:focus-within:not(:hover) .ui-menus__radio:not(:checked) + & {
    opacity: 0.5;
  }

  .ui-menus__radio:checked + & {
    font-style: italic;
  }
}

.ui-menus__main {
  position: relative;
  grid-column: 2 / span 3;

  @screen md {
    grid-column: 4 / span 6;
  }

  @screen lg {
    grid-column: 5 / span 4;
  }
}

.ui-menus__item {
  display: flex;
  flex-direction: column;
  gap: theme('spacing.30');

  @screen mdMax {
    & + & {
      margin-block-start: theme('spacing.120');
    }
  }

  @screen md {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;

    visibility: hidden;
    opacity: 0;

    transition:
      opacity theme('transitionDuration.500') theme('transitionTimingFunction.smooth'),
      visibility theme('transitionDuration.500') theme('transitionTimingFunction.smooth');

    &--is-active {
      position: static;
      visibility: visible;
      opacity: 1;
    }
  }
}

.ui-menus__download {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
