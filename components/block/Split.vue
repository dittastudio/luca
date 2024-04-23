<script lang="ts" setup>
interface Props {
  isReversed?: boolean
}

const { isReversed = false } = defineProps<Props>()
</script>

<template>
  <div
    data-component="BlockSplit"
    class="block-split section wrapper"
    :class="{ 'block-split--reverse': isReversed }"
  >
    <div class="block-split__media">
      <!-- Image/Video component goes here -->
      <NuxtImg
        src="https://placehold.co/600x400"
        :sizes="`
          100vw
          sm:100vw
          md:${(5 / 12 * 100)}vw
          3xl:${(5 / 12 * 1800)}px
        `"
      />
    </div>

    <div class="block-split__text">
      <!-- RichText goes here -->
      <div class="block-split__copy prose prose--large">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat quia, eveniet dolor at fugit id suscipit harum, aspernatur eaque perspiciatis odit nostrum voluptates culpa eos. Ratione, est. Soluta, qui mollitia.</p>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.block-split {

  @screen md {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: var(--app-inner-gutter);
  }
}

.block-split__media {
  @screen md {
    grid-column: 1 / span 5;

    .block-split--reverse & {
      grid-column: 8 / span 5;
      order: 1;
    }
  }

  @screen lg {
    grid-column: 2 / span 5;

    .block-split--reverse & {
      grid-column: 7 / span 5;
    }
  }

  @screen 3xl {
    grid-column: 2 / span 5;

    .block-split--reverse & {
      grid-column: 7 / span 5;
    }
  }
}

.block-split__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  @screen md {
    grid-column: 7 / span 6;
    text-align: left;

    .block-split--reverse & {
      grid-column: 1 / span 6;
    }
  }

  @screen lg {
    grid-column: 8 / span 5;
    text-align: left;

    .block-split--reverse & {
      grid-column: 2 / span 5;
    }
  }

  @screen 3xl {
    grid-column: 8 / span 4;

    .block-split--reverse & {
      grid-column: 3 / span 4;
    }
  }

  @screen mdMax {
    .block-split__media + & {
      margin-block-start: theme('spacing.60');
    }
  }
}

.block-split__copy {
  & p {
    max-width: 22em;
    margin-inline: auto;

    @screen md {
      margin-inline: 0;
    }
  }
}
</style>
