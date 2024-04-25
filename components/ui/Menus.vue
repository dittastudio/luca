<script lang="ts" setup>
const activeIndex = ref(0)
const menuItems = [
  'Dining Room',
  'Bar Dining',
  'Desserts',
  'Drinks',
  'Wine List',
  'Private Dining',
]
</script>

<template>
  <div
    class="ui-menus wrapper"
  >
    <nav class="ui-menus__nav">
      <button
        v-for="(item, index) in menuItems"
        :key="index"
        type="button"
        @click="activeIndex = index"
      >
        {{ item }}
      </button>
    </nav>

    <div class="ui-menus__grid">
      <h1 class="ui-menus__title type-body-large">
        Menu Item: {{ menuItems[activeIndex] }}
      </h1>

      <div class="ui-menus__paper">
        <NuxtImg
          class="aspect-[1/1.4] w-full h-full object-cover rounded-sm"
          src="https://placehold.co/600x400"
          alt="lol"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.ui-menus {
  position: relative;
  display: flex;
  min-height: 100vh;
  background-color: tomato;
}

.ui-menus__nav {
  position: absolute;
  top: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.ui-menus__grid {
  display: grid;
  grid-template-columns: var(--app-grid);
  gap: var(--app-inner-gutter);
  justify-content: center;

  width: 100%;

  text-align: center;
}

.ui-menus__title {
  grid-column: 1 / -1;
}

.ui-menus__paper {
  grid-column: 4 / span 6;
}
</style>
