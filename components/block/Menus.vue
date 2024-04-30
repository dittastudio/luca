<script lang="ts" setup>
import type { BlockMenusStoryblok } from '@/types/storyblok'
import { storyblokImageDimensions } from '@/utilities/helpers'

const activeIndex = ref(0)

interface Props {
  block: BlockMenusStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    class="block-menus wrapper"
  >
    <div class="block-menus__grid">
      <nav class="block-menus__nav">
        <div
          v-for="(menu, index) in block.menus"
          :key="menu._uid"
          class="block-menus__nav-item"
        >
          <input
            :id="`menus-${menu._uid}`"
            class="block-menus__radio"
            name="menus"
            type="radio"
            :checked="activeIndex === index"
            @change="activeIndex = index"
          >

          <label
            :for="`menus-${menu._uid}`"
            class="block-menus__label type-body-large"
            :class="{ 'block-menus__label--is-active': activeIndex === index }"
            :data-title="menu.title"
          >

            {{ menu.title }}
          </label>
        </div>
      </nav>

      <div class="block-menus__main">
        <template
          v-for="(menu, index) in block.menus"
          :key="menu._uid"
        >
          <div
            class="block-menus__item"
            :class="{ 'block-menus__item--is-active': activeIndex === index }"
          >
            <h1
              class="block-menus__title type-body-large"
            >
              {{ menu.title }}
            </h1>

            <div class="block-menus__carousel">
              <UiCarousel
                :slides="menu.images"
                ratio="1:1.414"
                :loop="false"
              >
                <template #slide="{ slide }">
                  <NuxtImg
                    class="block-menus__image"
                    provider="storyblok"
                    :src="slide.filename"
                    :alt="slide.alt"
                    :width="storyblokImageDimensions(slide.filename).width"
                    :height="storyblokImageDimensions(slide.filename).height"
                    :sizes="`
                      100vw
                      md:${6 / 12 * 100}vw
                      3xl:${6 / 12 * 1800}px
                    `"
                  />
                </template>
              </UiCarousel>
            </div>

            <div
              class="block-menus__download"
            >
              <NuxtLink
                :to="menu.pdf.filename"
                target="_blank"
              >
                <AppearanceButton>
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
.block-menus {
  position: relative;

  @screen mdMax {
    overflow: hidden;
  }

  @screen md {
    display: flex;
  }
}

.block-menus__grid {
  display: grid;
  grid-template-columns: theme('spacing.40') repeat(3, minmax(0, 1fr)) theme('spacing.40');
  justify-content: center;

  width: 100%;

  text-align: center;

  @screen md {
    grid-template-columns: var(--app-grid);
    gap: var(--app-inner-gutter);
  }
}

.block-menus__nav {
  position: sticky;
  top: 0;

  display: flex;
  grid-column: 1 / span 3;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  max-height: 100vh;

  @screen mdMax {
    display: none;
  }
}

.block-menus__nav-item {
  --link-padding-x: theme('spacing.10');
  --link-padding-y: 3px;

  position: relative;
  width: 100%;

  @screen md {
    margin-inline: calc(-1 * var(--link-padding-x));
  }
}

.block-menus__radio {
  pointer-events: none;

  position: absolute;
  top: 0;
  left: 0;

  opacity: 0;
}

.block-menus__label {
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

  .block-menus__nav:hover .block-menus__radio:not(:checked) + &:not(:hover),
  .block-menus__nav:focus-within:not(:hover) .block-menus__radio:not(:checked) + & {
    opacity: 0.5;
  }

  .block-menus__radio:checked + & {
    font-style: italic;
  }
}

.block-menus__main {
  position: relative;
  grid-column: 2 / span 3;

  @screen md {
    grid-column: 4 / span 6;
    width: calc(62.5vh - var(--app-header-height));
    max-width: 480px;
    margin-inline: auto;
  }
}

.block-menus__item {
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

.block-menus__title {
  @screen md {
    display: none;
  }
}

.block-menus__carousel {
  @screen md {
    overflow: hidden;
  }
}

.block-menus__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: theme('borderRadius.sm');
}

.block-menus__download {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
