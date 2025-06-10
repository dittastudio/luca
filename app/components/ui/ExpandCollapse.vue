<script lang="ts" setup>
interface Props {
  isOpen?: boolean
}

const { isOpen = false } = defineProps<Props>()

const inner = ref<HTMLDivElement | null>(null)
const height = ref<number>(0)
const resizeObserver = ref<ResizeObserver | undefined>(undefined)

const setHeightStyles = computed<{ height: string }>(() => ({
  height: isOpen && inner.value ? `${height.value}px` : '0px',
}))

onMounted(() => {
  resizeObserver.value = new window.ResizeObserver((entries) => {
    entries.forEach((entry) => {
      height.value = entry.contentRect.height
    })
  })

  if (inner.value) {
    height.value = inner.value.clientHeight
    resizeObserver.value.observe(inner.value)
  }
})

onUnmounted(() => {
  resizeObserver.value?.disconnect()
})
</script>

<template>
  <div
    class="ui-expand-collapse"
    :class="{ 'ui-expand-collapse--is-open': isOpen }"
    :style="setHeightStyles"
  >
    <div
      ref="inner"
      class="ui-expand-collapse__inner"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.ui-expand-collapse {
  overflow: hidden;
  transition: height theme('transitionDuration.350') theme('transitionTimingFunction.inOutExpo');
}

.ui-expand-collapse__inner {
  opacity: 0;
  transition: opacity theme('transitionDuration.150') theme('transitionTimingFunction.smooth');

  .ui-expand-collapse--is-open & {
    opacity: 1;
    transition: opacity theme('transitionDuration.300') theme('transitionTimingFunction.out') theme('transitionDelay.250');
  }
}
</style>
