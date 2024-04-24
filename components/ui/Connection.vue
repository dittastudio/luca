<script lang="ts" setup>
const line = ref<HTMLDivElement | null>(null)
const seen = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!(entry.target instanceof HTMLDivElement)) return

        if (entry.isIntersecting && !seen.value) {
          seen.value = true
          observer?.disconnect()
        }
      })
    },
    { rootMargin: '0px 0px 0px 0px', threshold: 1 },
  )

  line.value && observer?.observe(line.value)
})

onUnmounted(() => {
  observer && observer.disconnect()
})
</script>

<template>
  <div
    ref="line"
    class="connection"
  >
    <div
      :class="['connection__line', {
        'connection__line--seen': seen,
      }]"
    />
  </div>
</template>

<style lang="postcss" scoped>
.connection {
  width: 100%;
  height: 135px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;

  @screen md {
    height: 200px;
  }

  &__line {
    width: 1px;
    height: 0;
    background-color: theme('colors.white');
    transition: height theme('transitionDuration.1000') theme('transitionTimingFunction.smooth');

    &--seen {
      height: 100%;
    }
  }
}
</style>
