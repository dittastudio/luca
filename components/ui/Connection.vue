<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'

const line = ref<HTMLDivElement | null>(null)
const seen = ref(false)

useIntersectionObserver(
  line,
  ([{ target, isIntersecting }]) => {
    if (target instanceof HTMLDivElement && isIntersecting && !seen.value) {
      seen.value = true
    }
  },
  { rootMargin: '0px 0px 0px 0px', threshold: 1 },
)
</script>

<template>
  <div
    ref="line"
    class="ui-connection"
  >
    <div
      class="ui-connection__line"
      :class="[{
        'ui-connection__line--seen': seen,
      }]"
    />
  </div>
</template>

<style lang="postcss" scoped>
.ui-connection {
  --line-height: 135px;

  @screen md {
    --line-height: 200px;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  width: 100%;
  height: var(--line-height);

  &__line {
    transform-origin: 0 0;
    scale: 1 0 1;

    width: 1px;
    height: 100%;

    opacity: 0;
    background-color: currentcolor;

    transition:
      opacity theme('transitionDuration.1500') theme('transitionTimingFunction.outExpo'),
      scale theme('transitionDuration.1500') theme('transitionTimingFunction.outExpo');

    &--seen {
      scale: 1 1 1;
      opacity: 1;
    }
  }
}
</style>
