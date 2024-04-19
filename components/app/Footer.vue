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

const footerLinks: any = [{
  _uid: '123',
  link: {
    id: '123',
    url: '',
    linktype: 'footer',
    fieldtype: 'multilink',
    cached_url: '/privacy-policy',
  },
  title: 'Privacy Policy',
  component: 'link_list',
  items: []
}]
</script>

<template>
  <footer data-component="AppFooter" class="app-footer wrapper">
    <hr class="app-footer__break">

    <div class="app-footer__inner">
      <div class="app-footer__details prose prose--small" v-if="openingTimesTitle && openingTimes">
        <UiAccordionHybrid>
          <template #title>
            <h2 class="app-footer__title type-h4">{{ openingTimesTitle }}</h2>
          </template>

          <template #content>
            <StoryblokRichText class="app-footer__copy" :content="openingTimes" />
          </template>
        </UiAccordionHybrid>
      </div>

      <div class="app-footer__details prose prose--small" v-if="contactTitle && contact">
        <UiAccordionHybrid>
          <template #title>
            <h2 class="app-footer__title type-h4">{{ contactTitle }}</h2>
          </template>

          <template #content>
            <StoryblokRichText class="app-footer__copy" :content="contact" />
          </template>
        </UiAccordionHybrid>
      </div>

      <div class="app-footer__details prose prose--small" v-if="reservationsTitle && reservations">
        <UiAccordionHybrid>
          <template #title>
            <h2 class="app-footer__title type-h4">{{ reservationsTitle }}</h2>
          </template>
          <template #content>
            <StoryblokRichText class="app-footer__copy" :content="reservations" />
          </template>
        </UiAccordionHybrid>
      </div>

      <div class="app-footer__details app-footer__details--info prose prose--small">
        <UiAccordionHybrid>
          <template #title>
            <h2 class="app-footer__title type-h4">Info</h2>
          </template>
          <template #content>
            <AppFooterInfo :items="footerLinks" />
          </template>
        </UiAccordionHybrid>
      </div>

      <div class="app-footer__newsletter">
        <div class="prose prose--small" v-if="newsletterTitle && newsletter">
          <h2 class="app-footer__title type-h4">{{ newsletterTitle }}</h2>
          <StoryblokRichText class="app-footer__copy" :content="newsletter" />
        </div>

        <div class="smMax:hidden">
          <AppFooterInfo :items="footerLinks" />
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
.app-footer {
  padding-block: theme('spacing.120');

  @screen md {
    padding-block-end: theme('spacing.40');
  }
}

.app-footer__break {
  opacity: 0.2;
}

.app-footer__inner {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  padding-block-start: theme('spacing.40');

  @screen sm {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--app-inner-gutter);
  }

  @screen xl {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
}

.app-footer__details {
  @screen xl {
    grid-column: span 2;
  }

  @screen smMax {
    text-align: center;
  }
}

.app-footer__details--info {
  @screen sm {
    display: none;
  }
}

.app-footer__copy {
  .app-footer__title+& {
    margin-top: theme('spacing.20');
  }
}

.app-footer__newsletter {
  display: flex;
  flex-direction: column;
  gap: theme('spacing.40');
  justify-content: space-between;

  @screen smMax {
    order: -1;
    padding-block-end: theme('spacing.120');
    text-align: center;
  }

  @screen xl {
    grid-column: 9 / 13;
  }
}
</style>
