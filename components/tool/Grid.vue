<script lang="ts" setup>
const isOpen = ref<boolean>(false)

const toggleGrid = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <button
    data-grid-toggle
    type="button"
    class="fixed z-50 bottom-20 right-20 font-[monospace] text-14 text-offwhite p-10 shadow-lg backdrop-blur-sm rounded-md transition-all duration-200 ease-smooth"
    :class="[
      { 'bg-black/20 hover:bg-black/60 active:shadow-sm': !isOpen },
      { 'bg-black/60 active:shadow-sm': isOpen },
    ]"
    @click="toggleGrid"
  >
    Grid
  </button>

  <div
    :class="[
      { 'opacity-0': !isOpen },
      { 'opacity-100': isOpen },
    ]"
    class="wrapper fixed z-40 inset-x-0 w-full h-full pointer-events-none transition-opacity duration-200 ease-smooth"
  >
    <div class="grid gap-x-[var(--app-inner-gutter)] grid-cols-2 sm:grid-cols-4 md:grid-cols-12 h-screen">
      <div
        v-for="i in 12"
        :key="i"
        class="flex items-end justify-center bg-[red]/10"
        :class="[{ 'smMax:hidden': i > 2, 'mdMax:hidden': i > 4 }]"
      >
        <span class="text-white font-[monospace] opacity-50 text-32 pb-20">{{ i }}</span>
      </div>
    </div>
  </div>
</template>
