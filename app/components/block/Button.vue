<script lang="ts" setup>
import type { BlockButton } from '@@/.storyblok/types/285210/storyblok-components'

interface Props {
  block: BlockButton
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    data-component="block-button"
    class="wrapper flex items-center justify-center"
  >
    <StoryblokLink :item="block.link">
      <AppearanceButton>
        {{ block.title }}
      </AppearanceButton>
    </StoryblokLink>
  </div>
</template>
