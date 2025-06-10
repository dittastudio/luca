<script lang="ts" setup>
import type { BlockButtonStoryblok } from '@@/types/storyblok'

interface Props {
  block: BlockButtonStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="block-button wrapper"
  >
    <StoryblokLink :item="block.link">
      <AppearanceButton>
        {{ block.title }}
      </AppearanceButton>
    </StoryblokLink>
  </div>
</template>

<style lang="postcss" scoped>
.block-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
