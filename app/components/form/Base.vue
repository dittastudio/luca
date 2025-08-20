<script lang="ts" setup>
interface Props {
  loading?: boolean
}

const { loading = false } = defineProps<Props>()
</script>

<template>
  <form
    novalidate
    :class="[{ 'opacity-50 pointer-events-none transition-opacity duration-300 ease-smooth': loading }]"
  >
    <slot />
  </form>
</template>
