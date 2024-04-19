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
  <footer data-component="AppFooter" class="app-footer wrapper">
    <hr class="app-footer__break">

    <div class="app-footer__inner">
      <div class="app-footer__details prose prose--small" v-if="openingTimesTitle && openingTimes">
        <h2 class="app-footer__title type-h4">{{ openingTimesTitle }}</h2>
        <UiExpandCollapse>
          <StoryblokRichText class="app-footer__copy" :content="openingTimes" />
        </UiExpandCollapse>
      </div>

      <div class="app-footer__details prose prose--small" v-if="contactTitle && contact">
        <h2 class="app-footer__title type-h4">{{ contactTitle }}</h2>
        <StoryblokRichText class="app-footer__copy" :content="contact" />
      </div>

      <div class="app-footer__details prose prose--small" v-if="reservationsTitle && reservations">
        <h2 class="app-footer__title type-h4">{{ reservationsTitle }}</h2>
        <StoryblokRichText class="app-footer__copy" :content="reservations" />
      </div>

      <div class="app-footer__newsletter">
        <div class="prose prose--small" v-if="newsletterTitle && newsletter">
          <h2 class="app-footer__title type-h4">{{ newsletterTitle }}</h2>
          <StoryblokRichText class="app-footer__copy" :content="newsletter" />
        </div>

        <div class="app-footer__meta type-body-small">
          <ul class="app-footer__meta-list">
            <li class="app-footer__meta-item">©2024 All rights reserved</li>
            <li class="app-footer__meta-item">
              <NuxtLink class="app-footer__meta-link" to="/">Privacy Policy</NuxtLink>
            </li>
            <li class="app-footer__meta-item">
              <NuxtLink class="app-footer__meta-link" to="https://e-i-b.com/" target="_blank" rel="noopener noreferrer"><!--
              -->Design: Everything In Between
              </NuxtLink>
            </li>
            <li class="app-footer__meta-item">
              <NuxtLink class="app-footer__meta-link" to="https://ditta.studio/" target="_blank"
                rel="noopener noreferrer">made by ditta</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
.app-footer {
  padding-block: theme('spacing.120') theme('spacing.40');
}

.app-footer__break {
  opacity: 0.2;
}

.app-footer__inner {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: var(--app-inner-gutter);
  padding-block-start: theme('spacing.40');

  @screen sm {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @screen xl {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
}

.app-footer__details {
  @screen xl {
    grid-column: span 2;
  }
}

.app-footer__copy {
  .app-footer__title+& {
    margin-top: theme('spacing.20');
  }
}

.app-footer__newsletter {
  display: flex;

  @screen xl {
    grid-column: 9 / 13;
  }

  flex-direction: column;
  justify-content: space-between;
}

.app-footer__meta {
  overflow: hidden;
}

.app-footer__meta-list {
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.8em;
}

.app-footer__meta-item {
  &::before {
    content: '/';
    margin-inline: 0.25em;
  }
}

.app-footer__meta-link {
  @media (hover: hover) {
    transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
