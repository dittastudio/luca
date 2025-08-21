<script lang="ts" setup>
import type { BlockTextColumns } from '@@/.storyblok/types/285210/storyblok-components'

interface Props {
  block: BlockTextColumns
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="wrapper md:grid md:grid-cols-(--app-grid) md:gap-(--app-inner-gutter)"
  >
    <div class="prose md:col-start-2 md:col-span-10 3xl:col-start-3 3xl:col-span-8">
      <h2
        v-if="block.title"
        class="text-14 text-center mb-6 lg:mb-18"
      >
        {{ block.title }}
      </h2>

      <div class="text-left lg:columns-2 lg:gap-[calc(var(--app-inner-gutter)*5)] [&_p]:max-w-none">
        <StoryblokText
          v-if="storyblokRichTextContent(block.text)"
          :content="block.text"
        />
      </div>
    </div>
  </div>
</template>
