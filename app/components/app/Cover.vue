<script lang="ts" setup>
import IconLucaLogo from '@/assets/icons/luca-logo.svg'

interface Props {
  message?: string
}

const { message } = defineProps<Props>()

const coverVisible = useState('coverVisible', () => true)
const messageVisible = ref(false)
const logoVisible = ref(false)

onMounted(async () => {
  await wait(1000)

  if (message) {
    messageVisible.value = true
    await wait(2000)
    messageVisible.value = false
    await wait(1000)
  }

  logoVisible.value = true
  await wait(2000)
  coverVisible.value = false
})
</script>

<template>
  <div
    :class="[
      'fixed inset-0 z-(--app-layer-three) flex items-center justify-center h-(--app-cover-height) text-white bg-green',
      'transition-opacity duration-500 ease-smooth',
      {
        'opacity-0 pointer-events-none': !coverVisible,
        'opacity-100 pointer-events-auto': coverVisible,
      },
    ]"
  >
    <div class="wrapper">
      <h1
        v-if="message"
        :class="[
          'type-responsive-app-cover',
          'text-center text-wrap-balance',
          'transition-opacity duration-500 ease-smooth',
          {
            'opacity-0': !messageVisible,
            'opacity-100': messageVisible,
          },
        ]"
      >
        {{ message }}
      </h1>

      <IconLucaLogo
        class="app-cover__logo"
        :class="[
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'w-(--app-logo-responsive-width) h-auto',
          'transition-opacity duration-500 ease-smooth',
          {
            'opacity-0': !logoVisible,
            'opacity-100': logoVisible,
          },
        ]"
      />
    </div>
  </div>
</template>

<style>
html.is-storyblok-editor {
  .app-cover {
    display: none;
  }
}
</style>
