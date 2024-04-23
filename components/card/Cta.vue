<script lang="ts" setup>
interface Props {
  title: string
  copy?: string
}

const { title, copy = '' } = defineProps<Props>()
</script>

<template>
  <div
    data-component="CardCta"
    class="card-cta"
  >
    <div
      class="card-cta__image"
    >
      <slot name="image" />
    </div>

    <div
      class="card-cta__backdrop"
    >
      <slot name="image" />
    </div>

    <div
      v-if="title"
      class="card-cta__content"
    >
      <h2 class="card-cta__title type-h3">
        {{ title }}
      </h2>

      <p
        v-if="copy"
        class="card-cta__copy type-body-large"
      >
        {{ copy }}
      </p>
    </div>
  </div>
</template>

<style lang="postcss">
.card-cta {
  isolation: isolate;
  position: relative;
  background-color: var(--app-background-color);
}

.card-cta__backdrop {
  pointer-events: none;

  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  opacity: 0;
  filter:blur(20px);

  transition: opacity theme('transitionDuration.1000') theme('transitionTimingFunction.smooth');

  .card-cta:hover & {
    opacity: 1;
    transition: opacity theme('transitionDuration.500') theme('transitionTimingFunction.smooth');
  }
}

.card-cta__image {
  opacity: 1;
  transition: opacity theme('transitionDuration.1000') theme('transitionTimingFunction.smooth');

  .card-cta:hover & {
    opacity: 0;
    transition: opacity theme('transitionDuration.500') theme('transitionTimingFunction.smooth');
  }
}

.card-cta__content {
  text-align: center;
  opacity: 0;
  transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  .card-cta:hover & {
    scale: 1;
    opacity: 1;
    transition: opacity theme('transitionDuration.500') theme('transitionTimingFunction.smooth') 0.2s;
  }

  @screen md {
    position: absolute;
    inset: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @screen smMax {
    .card-cta__image + & {
      margin-block-start: theme('spacing.40');
    }
  }
}

.card-cta__copy {
  .card-cta__title + &::before {
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
