<script lang="ts" setup>
interface Props {
  isOpen?: boolean
}

const { isOpen = false } = defineProps<Props>()
</script>

<template>
  <span
    class="app-header-burger flex items-center justify-center size-[32px]"
    :class="{ 'app-header-burger--is-open': isOpen }"
  >
    <span
      :class="[
        'app-header-burger__inner',
        'relative w-full',
        'before:absolute before:inset-0 before:bg-current',
        'after:absolute after:inset-0 after:bg-current',
      ]"
    />

    <span class="sr-only">Toggle menu</span>
  </span>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.app-header-burger__inner {
  --burger-height: 1px;
  --burger-offset: 5px;

  height: var(--burger-height);

  &::before,
  &::after {
    --burger-out-open: 0.35s var(--ease-outExpo) 0.35s;
    --burger-in-open: 0.35s var(--ease-inExpo);
    --burger-out-close: 0.25s var(--ease-outExpo) 0.25s;
    --burger-in-close: 0.25s var(--ease-inExpo);

    transition:
      translate var(--burger-out-close),
      rotate var(--burger-in-close);
  }

  &::before {
    translate: 0 calc(-1 * var(--burger-offset)) 0;
  }

  &::after {
    translate: 0 var(--burger-offset) 0;
  }

  .app-header-burger--is-open & {
    &::before,
    &::after {
      transition: translate var(--burger-in-open), rotate var(--burger-out-open);
    }

    &::before {
      translate: 0 0 0;
      rotate: 45deg;
    }

    &::after {
      translate: 0 0 0;
      rotate: -45deg;
    }
  }
}
</style>
