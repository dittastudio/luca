<script lang="ts" setup>
interface Props {
  size?: number
  isOpen?: boolean
}

const { isOpen = false, size = 12 } = defineProps<Props>()
</script>

<template>
  <span
    class="ui-chevron relative block size-[var(--size)]"
    :class="{ 'ui-chevron--is-open': isOpen }"
    :style="`--size: ${size}px`"
  >
    <span
      class="absolute top-0 left-0 w-3/5 h-[1px] transition-transform duration-500 ease-inOutQuart"
      :class="{
        'rotate-45': !isOpen,
        '-rotate-45': isOpen,
      }"
    >
      <span
        class="block size-full bg-[currentColor] origin-left"
        :class="{
          'animate-[var(--accordion-wing-leave)]': !isOpen,
          'animate-[var(--accordion-wing-enter)]': isOpen,
        }"
      />
    </span>

    <span
      class="absolute top-0 right-0 w-3/5 h-[1px] transition-transform duration-500 ease-inOutQuart"
      :class="{
        '-rotate-45': !isOpen,
        'rotate-45': isOpen,
      }"
    >
      <span
        class="block size-full bg-[currentColor] origin-right"
        :class="{
          'animate-[var(--accordion-wing-leave)]': !isOpen,
          'animate-[var(--accordion-wing-enter)]': isOpen,
        }"
      />
    </span>
  </span>
</template>

<style lang="postcss">
.ui-chevron {
  --accordion-scale: 0.9 1;
  --accordion-wing-leave: wing-leave 0.5s theme('transitionTimingFunction.inOutQuart') forwards;
  --accordion-wing-enter: wing-enter 0.5s theme('transitionTimingFunction.inOutQuart') forwards;

  width: var(--size);
  height: 100%;
}

@keyframes wing-leave {
  0% {
    scale: 1 1;
  }

  50% {
    scale: var(--accordion-scale);
  }

  100% {
    scale: 1 1;
  }
}

@keyframes wing-enter {
  0% {
    scale: 1 1;
  }

  50% {
    scale: var(--accordion-scale);
  }

  100% {
    scale: 1 1;
  }
}
</style>
