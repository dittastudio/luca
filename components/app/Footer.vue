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
  <footer data-component="AppFooter" class="footer">
    <div v-if="openingTimesTitle && openingTimes">
      <h2 class="footer__title">{{ openingTimesTitle }}</h2>
      <StoryblokRichText :content="openingTimes" />
    </div>

    <div v-if="contactTitle && contact">
      <h2 class="footer__title">{{ contactTitle }}</h2>
      <StoryblokRichText :content="contact" />
    </div>

    <div v-if="reservationsTitle && reservations">
      <h2 class="footer__title">{{ reservationsTitle }}</h2>
      <StoryblokRichText :content="reservations" />
    </div>

    <div v-if="newsletterTitle && newsletter">
      <h2 class="footer__title">{{ newsletterTitle }}</h2>
      <StoryblokRichText :content="newsletter" />
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
.footer {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: theme('spacing.4');
}

.footer__title {
  margin-bottom: theme('spacing.4');
  font-size: theme('fontSize.20');
  font-weight: theme('fontWeight.bold');
  text-transform: uppercase;
}

&:deep(p) {
  margin-bottom: theme('spacing.4');
}
</style>
