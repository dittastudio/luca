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

<style scoped>
@reference "@/assets/css/main.css";

.ui-expand-collapse {
  overflow: hidden;
  transition: height 0.35s var(--ease-inOutExpo);
}

.ui-expand-collapse__inner {
  opacity: 0;
  transition: opacity 0.15s var(--ease-smooth);

  .ui-expand-collapse--is-open & {
    opacity: 1;
    transition: opacity 0.3s var(--ease-out) 0.25s;
  }
}
</style>
