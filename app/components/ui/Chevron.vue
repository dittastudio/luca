<script lang="ts" setup>
interface Props {
  size?: string
  isOpen?: boolean
}

const { isOpen = false, size = '0.4em' } = defineProps<Props>()
</script>

<template>
  <span
    class="ui-chevron relative top-[0.05em] grid"
    :class="{ 'ui-chevron--is-open': isOpen }"
    :style="`--size: ${size}`"
  >

    <span
      class="ui-chevron__item ui-chevron__item--up block border-t border-r size-[var(--size)] -rotate-45 transition-[opacity,transform] duration-250"
      :class="{
        'opacity-0 -translate-y-1/4 ease-inQuart': !isOpen,
        'opacity-100 translate-y-1/4 delay-250 ease-outQuart': isOpen,
      }"
    />

    <span
      class="ui-chevron__item ui-chevron__item--down block border-b border-r size-[var(--size)] rotate-45 transition-[opacity,transform] duration-250"
      :class="{
        'opacity-100 -translate-y-1/4 delay-250 ease-outQuart': !isOpen,
        'opacity-0 translate-y-1/4 ease-inQuart': isOpen,
      }"
    />
  </span>
</template>

<style lang="postcss" scoped>
.ui-chevron {
  grid-template-areas: "stack";
}

.ui-chevron__item {
  grid-area: stack;
}
</style>
