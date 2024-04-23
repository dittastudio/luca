<script lang="ts" setup>
import { hasRichTextContent } from '@/utilities/helpers'
import type { BlockTextStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockTextStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="block-text prose prose--large wrapper"
  >
    <StoryblokRichText
      v-if="hasRichTextContent(block.text)"
      :content="block.text"
    />
  </div>
</template>

<style lang="postcss">
.block-text {
  text-align: center;

  & :is(h1, h2, h3, h4, h5, h6) {
    font-family: theme('fontFamily.heading');
    font-size: theme('fontSize.14');
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: theme('letterSpacing.widest');

    @screen md {
      font-size: theme('fontSize.16');
    }
  }

  & p {
    max-width: 25em;
    margin-inline: auto;
  }

  blockquote {
    & p {
      &:first-of-type::before {
        content: open-quote;
      }

      &:last-of-type::after {
        content: close-quote;
      }
    }
  }
}
</style>
