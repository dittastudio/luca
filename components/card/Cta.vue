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

<style lang="postcss" scoped>
.card-cta {
  position: relative;
}

.card-cta__image {

}

.card-cta__content {
  text-align: center;

  @screen md {
    position: absolute;
    inset: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
