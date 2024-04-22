<script lang="ts" setup>
import IconFacebook from '@/assets/icons/facebook.svg'
import IconTikTok from '@/assets/icons/tiktok.svg'
import IconInstagram from '@/assets/icons/instagram.svg'
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
  items: [],
}]
</script>

<template>
  <footer
    data-component="AppFooter"
    class="app-footer wrapper"
  >
    <hr class="app-footer__break">

    <div class="app-footer__inner">
      <div class="app-footer__newsletter">
        <div
          v-if="newsletterTitle && newsletter"
          class="prose prose--small"
        >
          <h2 class="app-footer__title type-h4">
            {{ newsletterTitle }}
          </h2>

          <StoryblokRichText
            class="app-footer__copy"
            :content="newsletter"
          />

          <form
            class="app-footer__form"
            action=""
          >
            <input
              class="app-footer__input type-body"
              type="email"
              placeholder="Email"
              required
            >

            <button
              class="app-footer__submit type-h6"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <AppFooterAccordion
        v-if="openingTimesTitle && openingTimes"
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
        v-if="contactTitle && contact"
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
        v-if="reservationsTitle && reservations"
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
      <AppFooterInfo :items="footerLinks" />

      <div class="app-footer__social">
        <NuxtLink
          class="app-footer__social-link"
          to="https://www.facebook.com/Lucarestaurantlondon"
          title="Follow us on Facebook"
        >
          <IconFacebook
            width="16"
            height="16"
          />
        </NuxtLink>

        <NuxtLink
          class="app-footer__social-link"
          to="https://www.tiktok.com/@luca.restaurant"
          title="Follow us on TikTok"
        >
          <IconTikTok
            width="16"
            height="16"
          />
        </NuxtLink>

        <NuxtLink
          class="app-footer__social-link"
          to="https://www.instagram.com/luca.restaurant"
          title="Follow us on Instagram"
        >
          <IconInstagram
            width="16"
            height="16"
          />
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
.app-footer {
  padding-block: theme('spacing.120') theme('spacing.40');

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
    grid-column: span 3;
  }

  @screen base {
    grid-column: span 2;
  }

  @screen smMax {
    text-align: center;
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
    padding-block-end: theme('spacing.120');
    text-align: center;
  }

  @screen sm {
    order: 1;
  }

  @screen xl {
    grid-column: 10 / 13;
  }

  @screen base {
    grid-column: 9 / 13;
  }
}

.app-footer__form {
  display: flex;
  gap: theme('spacing.10');
  justify-content: space-between;

  border-bottom: 1px solid theme('colors.white/20%');

  transition: border-color theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  &:focus-within {
    border-color: theme('colors.white/100%');
  }
}

.app-footer__input {
  --input-padding-end: 4px;

  width: 100%;
  padding-block: theme('spacing.20') var(--input-padding-end);
  outline: none;

  @screen md {
    font-size: theme('fontSize.14');
  }

  &::placeholder {
    color: currentcolor;
    opacity: 1;
    transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');
  }

  &:hover::placeholder {
    opacity: 0.5;
  }

  &:focus::placeholder {
    opacity: 0;
  }
}

.app-footer__submit {
  padding-block-start: theme('spacing.20');
  opacity: 1;
  transition: opacity theme('transitionDuration.200') theme('transitionTimingFunction.smooth');

  &:hover {
    opacity: 0.5;
  }

  &:active {
    opacity: 0.75;
  }
}

.app-footer__bottom {
  display: flex;
  grid-column: 1 / -1;
  flex-direction: column-reverse;
  gap: theme('spacing.50');
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
