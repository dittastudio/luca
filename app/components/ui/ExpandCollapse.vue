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
    data-component="ui-expand-collapse"
    class="overflow-hidden transition-[height] duration-350 ease-inOutExpo"
    :style="setHeightStyles"
  >
    <div
      ref="inner"
      :class="{
        'opacity-0 transition-opacity duration-150 ease-smooth': !isOpen,
        'opacity-100 transition-opacity duration-300 ease-smooth delay-250': isOpen,
      }"
    >
      <slot />
    </div>
  </div>
</template>
