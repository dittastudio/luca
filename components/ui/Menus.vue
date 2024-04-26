<script lang="ts" setup>
const activeIndex = ref(0)

const menuItems = [
  {
    title: 'Dining Room',
    images: [
      'https://placehold.co/600x840/000/FFF',
      'https://placehold.co/600x840/FFF/000',
    ],
    link: 'https://google.com',
  },
  {
    title: 'Bar Dining',
    images: [
      'https://placehold.co/600x840/F00/FFF',
      'https://placehold.co/600x840/FFF/F00',
    ],
    link: 'https://google.com',
  },
  {
    title: 'Desserts',
    images: [
      'https://placehold.co/600x840/000/FFF',
      'https://placehold.co/600x840/FFF/000',
    ],
    link: 'https://google.com',
  },
  {
    title: 'Drinks',
    images: [
      'https://placehold.co/600x840/000/FFF',
      'https://placehold.co/600x840/FFF/000',
    ],
    link: 'https://google.com',
  },
  {
    title: 'Wine List',
    images: [
      'https://placehold.co/600x840/000/FFF',
      'https://placehold.co/600x840/FFF/000',
    ],
    link: 'https://google.com',
  },
  {
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

      <Transition name="fade">
        <h1
          v-if="menuItems[activeIndex]"
          :key="activeIndex"
          class="ui-menus__title type-body-large"
        >
          {{ menuItems[activeIndex].title }}
        </h1>
      </Transition>

      <Transition name="fade">
        <div
          v-if="menuItems[activeIndex]"
          :key="activeIndex"
          class="ui-menus__paper"
        >
          <UiCarousel
            :slides="menuItems[activeIndex].images"
            ratio="3:4"
          >
            <template #slide="{ slide }">
              <NuxtImg
                class="aspect-3/4 w-full h-full object-cover rounded-sm"
                :src="slide"
                alt="lol"
                loading="lazy"
              />
            </template>
          </UiCarousel>
        </div>
      </Transition>

      <Transition name="fade">
        <div
          v-if="menuItems[activeIndex]"
          :key="activeIndex"
          class="ui-menus__download"
        >
          <NuxtLink
            :to="menuItems[activeIndex].link"
            target="_blank"
          >
            <AppearanceButton type="green">
              Download {{ menuItems[activeIndex].title }} Menu
            </AppearanceButton>
          </NuxtLink>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.ui-menus {
  position: relative;
  overflow: hidden;
  display: flex;
  min-height: 100vh;
}

.ui-menus__grid {
  display: grid;
  grid-template-columns: var(--app-grid);
  grid-template-rows: 1fr auto 1fr;
  gap: theme('spacing.40') var(--app-inner-gutter);
  align-items: center;
  justify-content: center;

  width: 100%;

  text-align: center;
}

.ui-menus__nav {
  display: flex;
  grid-column: 1 / span 3;
  grid-row: 2 / span 1;
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

  .ui-menus__nav:focus-within &:not(:focus-visible, :focus, :hover),
  .ui-menus__nav:hover &:not(:hover) {
    opacity: 0.5;
  }
}

.ui-menus__title {
  grid-column: 1 / -1;
  grid-row: 1 / span 1;
  margin-block-start: auto;
}

.ui-menus__paper {
  grid-column: 4 / span 6;
  grid-row: 2 / span 1;

  @screen lg {
    grid-column: 5 / span 4;
  }
}

.ui-menus__download {
  display: flex;
  grid-column: 1 / -1;
  grid-row: 3 / span 1;
  align-items: center;
  justify-content: center;

  margin-block-end: auto;
}
</style>
