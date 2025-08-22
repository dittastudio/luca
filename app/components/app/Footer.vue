<script lang="ts" setup>
import type { StoryblokRichtext } from '@@/.storyblok/types/storyblok'
import IconFacebook from '@/assets/icons/facebook.svg'
import IconInstagram from '@/assets/icons/instagram.svg'
import IconTikTok from '@/assets/icons/tiktok.svg'
import IconVimeo from '@/assets/icons/vimeo.svg'

interface Props {
  openingTimesTitle?: string
  openingTimes?: StoryblokRichtext
  contactTitle?: string
  contact?: StoryblokRichtext
  reservationsTitle?: string
  reservations?: StoryblokRichtext
  newsletterTitle?: string
  newsletter?: StoryblokRichtext
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
  <div class="wrapper pb-8">
    <hr class="opacity-20">

    <div
      :class="[
        'grid grid-cols-1 pt-8',
        'sm:grid-cols-2 sm:gap-(--app-inner-gutter)',
        'xl:grid-cols-(--app-grid)',
      ]"
    >
      <div
        :class="[
          'flex flex-col gap-8 justify-between',
          'max-sm:pb-24 max-sm:text-center',
          'sm:order-1',
          'xl:col-start-10 xl:col-end-13',
          '2xl:col-start-9 2xl:col-end-13',
        ]"
      >
        <div
          v-if="newsletterTitle && storyblokRichTextContent(newsletter)"
          class="prose prose--small"
        >
          <h2>
            {{ newsletterTitle }}
          </h2>

          <div class="text-balance [*+&]:mt-4">
            <StoryblokText :content="newsletter" />
          </div>

          <div class="[*+&]:mt-2">
            <AppNewsletterForm />
          </div>
        </div>
      </div>

      <AppFooterAccordion
        v-if="openingTimesTitle && storyblokRichTextContent(openingTimes)"
        :id="openingTimesTitle"
        :class="[
          'prose prose--small',
          'max-sm:text-center',
          'xl:col-span-3',
          '2xl:col-span-2',
        ]"
      >
        <template #title>
          <h2>
            {{ openingTimesTitle }}
          </h2>
        </template>

        <template #content>
          <div class="text-pretty">
            <StoryblokText :content="openingTimes" />
          </div>
        </template>
      </AppFooterAccordion>

      <AppFooterAccordion
        v-if="contactTitle && storyblokRichTextContent(contact)"
        :id="contactTitle"
        :class="[
          'prose prose--small',
          'max-sm:text-center',
          'xl:col-span-3',
          '2xl:col-span-2',
        ]"
      >
        <template #title>
          <h2>
            {{ contactTitle }}
          </h2>
        </template>

        <template #content>
          <div class="text-pretty">
            <StoryblokText :content="contact" />
          </div>
        </template>
      </AppFooterAccordion>

      <AppFooterAccordion
        v-if="reservationsTitle && storyblokRichTextContent(reservations)"
        :id="reservationsTitle"
        :class="[
          'prose prose--small',
          'max-sm:text-center',
          'xl:col-span-3',
          '2xl:col-span-2',
        ]"
      >
        <template #title>
          <h2>
            {{ reservationsTitle }}
          </h2>
        </template>

        <template #content>
          <div class="text-pretty">
            <StoryblokText :content="reservations" />
          </div>
        </template>
      </AppFooterAccordion>
    </div>

    <div
      :class="[
        'col-span-full',
        'flex flex-col-reverse gap-8 items-center justify-between',
        'mt-12',
        'sm:flex-row sm:items-end sm:mt-24',
      ]"
    >
      <slot name="navigation" />

      <div class="flex -m-3">
        <template v-for="socialItem in socialList">
          <NuxtLink
            v-if="socialItem.url"
            :key="socialItem.name"
            class="p-3 transition-opacity duration-200 ease-smooth hover:opacity-50 [a:hover_&:not(:hover)]:opacity-60"
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
