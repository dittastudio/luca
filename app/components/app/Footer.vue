<script lang="ts" setup>
import type { RichtextStoryblok } from '@@/types/storyblok'
import IconFacebook from '@/assets/icons/facebook.svg'
import IconInstagram from '@/assets/icons/instagram.svg'
import IconTikTok from '@/assets/icons/tiktok.svg'
import IconVimeo from '@/assets/icons/vimeo.svg'

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
  socialVimeo?: string
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
  socialFacebook,
  socialTiktok,
  socialInstagram,
  socialVimeo,
} = defineProps<Props>()

const socialList = [
  {
    name: 'Facebook',
    icon: IconFacebook,
    url: socialFacebook,
  },
  {
    name: 'TikTok',
    icon: IconTikTok,
    url: socialTiktok,
  },
  {
    name: 'Instagram',
    icon: IconInstagram,
    url: socialInstagram,
  },
  {
    name: 'Vimeo',
    icon: IconVimeo,
    url: socialVimeo,
  },
]
</script>

<template>
  <div class="app-footer wrapper">
    <hr class="app-footer__break">

    <div class="app-footer__inner">
      <div class="app-footer__newsletter">
        <div
          v-if="newsletterTitle && storyblokRichTextContent(newsletter)"
          class="prose prose--small"
        >
          <h2 class="app-footer__title type-h4">
            {{ newsletterTitle }}
          </h2>

          <div class="app-footer__copy">
            <StoryblokText :content="newsletter" />
          </div>

          <div class="app-footer__form">
            <AppNewsletterForm />
          </div>
        </div>
      </div>

      <AppFooterAccordion
        v-if="openingTimesTitle && storyblokRichTextContent(openingTimes)"
        :id="openingTimesTitle"
        class="app-footer__details prose prose--small"
      >
        <template #title>
          <h2 class="app-footer__title type-h4">
            {{ openingTimesTitle }}
          </h2>
        </template>

        <template #content>
          <div class="app-footer__copy">
            <StoryblokText :content="openingTimes" />
          </div>
        </template>
      </AppFooterAccordion>

      <AppFooterAccordion
        v-if="contactTitle && storyblokRichTextContent(contact)"
        :id="contactTitle"
        class="app-footer__details prose prose--small"
      >
        <template #title>
          <h2 class="app-footer__title type-h4">
            {{ contactTitle }}
          </h2>
        </template>

        <template #content>
          <div class="app-footer__copy">
            <StoryblokText :content="contact" />
          </div>
        </template>
      </AppFooterAccordion>

      <AppFooterAccordion
        v-if="reservationsTitle && storyblokRichTextContent(reservations)"
        :id="reservationsTitle"
        class="app-footer__details prose prose--small"
      >
        <template #title>
          <h2 class="app-footer__title type-h4">
            {{ reservationsTitle }}
          </h2>
        </template>

        <template #content>
          <div class="app-footer__copy">
            <StoryblokText :content="reservations" />
          </div>
        </template>
      </AppFooterAccordion>
    </div>

    <div class="app-footer__bottom">
      <slot name="navigation" />

      <div class="app-footer__social">
        <template v-for="socialItem in socialList">
          <NuxtLink
            v-if="socialItem.url"
            :key="socialItem.name"
            class="app-footer__social-link"
            :to="socialItem.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <component
              :is="socialItem.icon"
              width="16"
              height="16"
            />

            <span class="sr-only">Follow us on {{ socialItem.name }}</span>
          </NuxtLink>
        </template>
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
