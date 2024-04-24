<script lang="ts" setup>
interface Props {
  title: string
  headline: string
}

const { title, headline } = defineProps<Props>()
</script>

<template>
  <div class="card-media">
    <div
      class="card-media__backdrop"
    >
      <slot name="media" />
    </div>

    <div
      class="card-media__media"
    >
      <slot name="media" />
    </div>

    <div class="card-media__content">
      <h2
        v-if="title"
        class="card-media__title type-h3"
      >
        {{ title }}
      </h2>

      <p
        v-if="headline"
        class="card-media__headline type-body-large"
      >
        {{ headline }}
      </p>
    </div>
  </div>
</template>

<style lang="postcss">
.card-media {
  isolation: isolate;
  position: relative;

  @media (hover: hover) {
    @screen md {
      background-color: var(--app-background-color);
    }
  }
}

.card-media__backdrop {
  display: none;

  @media (hover: hover) {
    @screen md {
      pointer-events: none;

      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;

      display: block;

      width: 100%;
      height: 100%;

      opacity: 0;
      filter:blur(20px);

      transition: opacity theme('transitionDuration.700') theme('transitionTimingFunction.smooth');

      a:is(:hover, :focus) & {
        opacity: 1;
        transition: opacity theme('transitionDuration.500') theme('transitionTimingFunction.smooth');
      }
    }
  }
}

.card-media__media {
  @media (hover: hover) {
    @screen md {
      opacity: 1;
      transition: opacity theme('transitionDuration.700') theme('transitionTimingFunction.smooth');

      a:is(:hover, :focus) & {
        opacity: 0;
        transition: opacity theme('transitionDuration.500') theme('transitionTimingFunction.smooth');
      }
    }
  }
}

.card-media__content {
  padding: theme('spacing.20');
  text-align: center;

  @media (hover: hover) {
    @screen md {
      position: absolute;
      inset: 0;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      opacity: 0;

      transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

      a:is(:hover, :focus) & {
        opacity: 1;
        transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth') theme('transitionDelay.150');
      }
    }
  }

  @screen mdMax {
    .card-media__media + & {
      margin-block-start: theme('spacing.40');
    }
  }
}

.card-media__headline {
  .card-media__title + &::before {
    content: '';

    display: block;

    width: 70px;
    height: 1px;
    margin-block: theme('spacing.20');
    margin-inline: auto;

    opacity: 1;
    background-color: currentcolor;
  }
}
</style>
