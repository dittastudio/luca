<script lang="ts" setup>
import type { RichtextStoryblok } from '@/types/storyblok'

interface Props {
  openingTimesTitle?: string
  openingTimes?: RichtextStoryblok
  contactTitle?: string
  contact?: RichtextStoryblok
  reservationsTitle?: string
  reservations?: RichtextStoryblok
  newsletterTitle?: string
  newsletter?: RichtextStoryblok
}

const {
  openingTimesTitle,
  openingTimes,
  contactTitle,
  contact,
  reservationsTitle,
  reservations,
  newsletterTitle,
  newsletter,
} = defineProps<Props>()
</script>

<template>
  <footer data-component="AppFooter" class="app-footer wrapper section">
    <div v-if="openingTimesTitle && openingTimes">
      <h2 class="app-footer__title type-h4">{{ openingTimesTitle }}</h2>
      <StoryblokRichText class="app-footer__copy prose-link" :content="openingTimes" />
    </div>

    <div v-if="contactTitle && contact">
      <h2 class="app-footer__title type-h4">{{ contactTitle }}</h2>
      <StoryblokRichText class="app-footer__copy prose-link" :content="contact" />
    </div>

    <div v-if="reservationsTitle && reservations">
      <h2 class="app-footer__title type-h4">{{ reservationsTitle }}</h2>
      <StoryblokRichText class="app-footer__copy prose-link" :content="reservations" />
    </div>

    <div v-if="newsletterTitle && newsletter">
      <h2 class="app-footer__title type-h4">{{ newsletterTitle }}</h2>
      <StoryblokRichText class="app-footer__copy prose-link" :content="newsletter" />
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
.app-footer {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--app-inner-gutter);

  :deep(p) {
    font-size: theme('fontSize.14');
    letter-spacing: theme('letterSpacing.wide');
  }

  :deep(p+p) {
    margin-top: theme('spacing.20');
  }
}

.app-footer__copy {
  .app-footer__title+& {
    margin-top: theme('spacing.20');
  }
}
</style>
