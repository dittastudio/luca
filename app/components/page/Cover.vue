<script lang="ts" setup>
interface Props {
  message: string
}

const { message } = defineProps<Props>()

const coverVisible = ref(true)
const messageVisible = ref(false)

onMounted(async () => {
  await wait(1000)
  messageVisible.value = true
  await wait(2000)
  messageVisible.value = false
  await wait(1000)
  coverVisible.value = false
})
</script>

<template>
  <div
    :class="[
      'sticky top-0 z-(--app-layer-three)',
      'flex items-center justify-center h-dvh mb-[-100dvh]',
      'color-(--app-text-color) bg-offwhite',
      'transition-opacity duration-500 ease-smooth',
      {
        'opacity-0 pointer-events-none': !coverVisible,
        'opacity-100 pointer-events-auto': coverVisible,
      },
    ]"
  >
    <div class="wrapper">
      <h1
        :class="[
          'type-responsive-page-cover',
          'relative top-[-0.065em] text-center text-balance mx-auto max-w-[15em]',
          'transition-opacity duration-500 ease-smooth',
          {
            'opacity-0': !messageVisible,
            'opacity-100': messageVisible,
          },
        ]"
      >
        {{ message }}
      </h1>
    </div>
  </div>
</template>
