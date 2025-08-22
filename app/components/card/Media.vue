<script lang="ts" setup>
interface Props {
  title: string
  headline: string
}

const { title, headline } = defineProps<Props>()
</script>

<template>
  <div class="relative isolate">
    <div
      class="card-media__media"
    >
      <slot name="media" />
    </div>

    <div class="card-media__content p-4 text-center md:absolute md:inset-0 md:flex md:flex-col md:items-center md:justify-center">
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

<style scoped>
@reference "@/assets/css/main.css";

.card-media__media {
  @media (hover: hover) {
    @variant md {
      will-change: filter;
      opacity: 1;
      filter: blur(0);
      transition: filter 0.7s var(--ease-smooth);

      a:is(:hover, :focus) & {
        filter: blur(20px);
        transition: filter 0.5s var(--ease-smooth);
      }
    }
  }
}

.card-media__content {
  @media (hover: hover) {
    @variant md {
      opacity: 0;

      transition: opacity 0.2s var(--ease-smooth);

      a:is(:hover, :focus) & {
        opacity: 1;

        transition: opacity 0.2s var(--ease-smooth) 0.15s;
      }
    }
  }

  @variant max-md {
    .card-media__media + & {
      margin-block-start: --spacing(8);
    }
  }
}

.card-media__headline {
  .card-media__title + &::before {
    content: '';

    display: block;

    width: 70px;
    height: 1px;
    margin-block: --spacing(4);
    margin-inline: auto;

    opacity: 1;
    background-color: currentcolor;
  }
}
</style>
