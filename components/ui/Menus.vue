<script lang="ts" setup>
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
</script>

<template>
  <div
    class="ui-menus wrapper"
  >
    <div class="ui-menus__grid">
      <nav class="ui-menus__nav">
        <button
          v-for="(item, index) in menuItems"
          :key="index"
          type="button"
          class="ui-menus__nav-item type-body-large"
          :class="{ 'ui-menus__nav-item--is-active': activeIndex === index }"
          :name="item.title"
          @click="activeIndex = index"
        >
          {{ item.title }}
        </button>
      </nav>

      <div class="ui-menus__main">
        <template
          v-for="(item, index) in menuItems"
          :key="item._uid"
        >
          <div
            class="ui-menus__item"
            :class="{ 'ui-menus__item--is-active': activeIndex === index }"
          >
            <h1
              class="ui-menus__title type-body-large"
            >
              {{ item.title }}
            </h1>

            <div
              class="ui-menus__paper"
            >
              <UiCarousel
                :slides="item.images"
                ratio="3:4"
                :loop="false"
              >
                <template #slide="{ slide }">
                  <NuxtImg
                    class="aspect-3/4 w-full h-full object-cover rounded-sm"
                    :src="slide"
                    alt="lol"
                  />
                </template>
              </UiCarousel>
            </div>

            <div
              class="ui-menus__download"
            >
              <NuxtLink
                :to="item.link"
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
  --link-padding-x: theme('spacing.10');
  --link-padding-y: 3px;

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
    content: attr(name);

    overflow: hidden;
    display: block;

    height: 0;

    font-style: normal;

    visibility: hidden;
    opacity: 0;
  }

  &:is(:hover, :focus-visible),
  .ui-menus__nav:not(:hover) &.ui-menus__nav-item--is-active {
    font-style: italic;
  }

  .ui-menus__nav:focus-within &:not(:hover, :focus, :focus-visible),
  .ui-menus__nav:hover &:not(:hover) {
    opacity: 0.5;
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
