<script lang="ts" setup>
import type { RichtextStoryblok } from '@/types/storyblok'
import IconFacebook from '@/assets/icons/facebook.svg'
import IconTikTok from '@/assets/icons/tiktok.svg'
import IconInstagram from '@/assets/icons/instagram.svg'
import { hasRichTextContent } from '@/utilities/helpers'

interface Props {
  openingTimesTitle?: string
  openingTimes?: RichtextStoryblok
  contactTitle?: string
  contact?: RichtextStoryblok
  reservationsTitle?: string
  reservations?: RichtextStoryblok
  newsletterTitle?: string
  newsletter?: RichtextStoryblok
  socialFacebook?: string
  socialTiktok?: string
  socialInstagram?: string
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
  <div class="app-footer wrapper">
    <hr class="app-footer__break">

    <div class="app-footer__inner">
      <div class="app-footer__newsletter">
        <div
          v-if="newsletterTitle && hasRichTextContent(newsletter)"
          class="prose prose--small"
        >
          <h2 class="app-footer__title type-h4">
            {{ newsletterTitle }}
          </h2>

          <StoryblokRichText
            class="app-footer__copy"
            :content="newsletter"
          />

          <div class="app-footer__form">
            <AppNewsletterForm />
          </div>
        </div>
      </div>

      <AppFooterAccordion
        v-if="openingTimesTitle && hasRichTextContent(openingTimes)"
        :id="openingTimesTitle"
        class="app-footer__details prose prose--small"
      >
        <template #title>
          <h2 class="app-footer__title type-h4">
            {{ openingTimesTitle }}
          </h2>
        </template>

        <template #content>
          <StoryblokRichText
            class="app-footer__copy"
            :content="openingTimes"
          />
        </template>
      </AppFooterAccordion>

      <AppFooterAccordion
        v-if="contactTitle && hasRichTextContent(contact)"
        :id="contactTitle"
        class="app-footer__details prose prose--small"
      >
        <template #title>
          <h2 class="app-footer__title type-h4">
            {{ contactTitle }}
          </h2>
        </template>

        <template #content>
          <StoryblokRichText
            class="app-footer__copy"
            :content="contact"
          />
        </template>
      </AppFooterAccordion>

      <AppFooterAccordion
        v-if="reservationsTitle && hasRichTextContent(reservations)"
        :id="reservationsTitle"
        class="app-footer__details prose prose--small"
      >
        <template #title>
          <h2 class="app-footer__title type-h4">
            {{ reservationsTitle }}
          </h2>
        </template>

        <template #content>
          <StoryblokRichText
            class="app-footer__copy"
            :content="reservations"
          />
        </template>
      </AppFooterAccordion>
    </div>

    <div class="app-footer__bottom">
      <slot name="navigation" />

      <div class="app-footer__social">
        <NuxtLink
          v-if="socialFacebook"
          class="app-footer__social-link"
          :to="socialFacebook"
          title="Follow us on Facebook"
        >
          <IconFacebook
            width="16"
            height="16"
          />

          <span class="sr-only">Follow us on Facebook</span>
        </NuxtLink>

        <NuxtLink
          v-if="socialTiktok"
          class="app-footer__social-link"
          :to="socialTiktok"
          title="Follow us on TikTok"
        >
          <IconTikTok
            width="16"
            height="16"
          />

          <span class="sr-only">Follow us on TikTok</span>
        </NuxtLink>

        <NuxtLink
          v-if="socialInstagram"
          class="app-footer__social-link"
          :to="socialInstagram"
          title="Follow us on Instagram"
        >
          <IconInstagram
            width="16"
            height="16"
          />

          <span class="sr-only">Follow us on Instagram</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.app-footer {
  padding-block-end: theme('spacing.40');
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
    grid-template-columns: var(--app-grid);
  }
}

.app-footer__details {
  @screen xl {
    grid-column: span 3;
  }

  @screen 2xl {
    grid-column: span 2;
  }

  @screen smMax {
    text-align: center;
  }
}

.app-footer__newsletter {
  display: flex;
  flex-direction: column;
  gap: theme('spacing.40');
  justify-content: space-between;

  @screen smMax {
    padding-block-end: theme('spacing.120');
    text-align: center;
  }

  @screen sm {
    order: 1;
  }

  @screen xl {
    grid-column: 10 / 13;
  }

  @screen 2xl {
    grid-column: 9 / 13;
  }
}

.app-footer__copy {
  text-wrap: balance;

  .app-footer__title + & {
    margin-block-start: theme('spacing.20');
  }
}

.app-footer__form {
  .app-footer__copy + & {
    margin-block-start: theme('spacing.10');
  }
}

.app-footer__bottom {
  display: flex;
  grid-column: 1 / -1;
  flex-direction: column-reverse;
  gap: theme('spacing.40');
  align-items: center;
  justify-content: space-between;

  margin-block-start: theme('spacing.60');

  @screen sm {
    flex-direction: row;
    align-items: flex-end;
    margin-block-start: theme('spacing.120');
  }
}

.app-footer__social {
  --social-padding: theme('spacing.15');

  display: flex;
  margin: calc(-1 * var(--social-padding));
}

.app-footer__social-link {
  padding: var(--social-padding);
  transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  .app-footer__social:hover &:not(:hover) {
    opacity: 0.5;
  }
}
</style>
