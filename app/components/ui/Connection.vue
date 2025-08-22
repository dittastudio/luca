<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'

const line = ref<HTMLDivElement | null>(null)
const seen = ref(false)

useIntersectionObserver(
  line,
  ([target]) => {
    if (target?.isIntersecting && !seen.value) {
      seen.value = true
    }
  },
  { rootMargin: '0px 0px 0px 0px', threshold: 1 },
)
</script>

<template>
  <div
    ref="line"
    class="flex flex-col items-center justify-start w-full h-[135px] md:h-[200px]"
  >
    <div
      class="ui-connection__line "
      :class="[
        'w-px h-full bg-current origin-top',
        'transition-[opacity,scale] duration-1500 ease-outExpo',
        {
          'opacity-0 scale-y-0': !seen,
          'opacity-100 scale-y-100': seen,
        },
      ]"
    />
  </div>
</template>
