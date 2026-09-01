import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'

const isSpa = process.env.IS_SPA === 'true'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/seo',
    'nuxt-gtag',
    'nuxt-ai-ready',
    ['@nuxt/image', 
      {
        provider: 'storyblok',
        storyblok: {
          baseURL: 'https://a2.storyblok.com',
          modifiers: {
            smart: true,
            format: 'webp',
          },
        },
        domains: ['storyblok.com', 'luca.restaurant'],
        quality: 80,
        screens: {
          'xs': 375,
          'sm': 640,
          'md': 768,
          'lg': 1024,
          'xl': 1200,
          '2xl': 1440,
          '3xl': 1920,
        },
      } 
    ],
    ['@storyblok/nuxt', {
      accessToken: process.env.NUXT_STORYBLOK_TOKEN
    }],
  ],
  ssr: !isSpa,
  components: true,
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en-GB',
      },
      meta: [
        { name: 'author', content: 'LUCA' },
        { name: 'revisit-after', content: '1 day' },
        { name: 'msapplication-TileColor', content: '#2D3F2F' },
        { name: 'theme-color', content: '#2D3F2F' },
        { name: 'google', content: 'notranslate' },
        { 'http-equiv': 'content-language', 'content': 'en-GB' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://a2.storyblok.com' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preload', type: 'font/woff2', href: '/fonts/Magister-Regular.woff2', as: 'font', crossorigin: '' },
        { rel: 'preload', type: 'font/woff2', href: '/fonts/Magister-Italic.woff2', as: 'font', crossorigin: '' },
        { rel: 'preload', type: 'font/woff2', href: '/fonts/american-grotesk-condensed-medium.woff2', as: 'font', crossorigin: '' },
      ],
    },
    pageTransition: { name: 'fade', mode: 'out-in' },
    layoutTransition: false,
  },
  css: ['@/assets/css/app.css'],
  alias: {
    '#storyblok-components': fileURLToPath(new URL('./.storyblok/types/285210/storyblok-components', import.meta.url)),
    '#storyblok-types': fileURLToPath(new URL('./.storyblok/types/storyblok', import.meta.url)),
  },
  routeRules: {
    '/**': {
      prerender: !isSpa,
    },
  },
  nitro: {
    prerender: {
      crawlLinks: !isSpa,
      routes: isSpa ? [] : ['/'],
      autoSubfolderIndex: false,
      ignore: [(route) => route.includes('?')],
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  features: {
    noScripts: false,
  },
  compatibilityDate: '2025-04-13',
  seo: {
    automaticOgAndTwitterTags: false,
  },
  site: {
    url: 'https://luca.restaurant',
    name: 'LUCA',
  },
  runtimeConfig: {
    MAILCHIMP_API_KEY: process.env.NUXT_MAILCHIMP_API_KEY,
    MAILCHIMP_LIST_ID: process.env.NUXT_MAILCHIMP_LIST_ID,
    MAILCHIMP_SERVER: process.env.NUXT_MAILCHIMP_SERVER,
    public: {
      STORYBLOK_TOKEN: process.env.NUXT_STORYBLOK_TOKEN,
      STORYBLOK_VERSION: process.env.NUXT_STORYBLOK_VERSION,
    },
  },
  vite: {
    resolve: {
      dedupe: [
        'vue',
      ],
    },
    plugins: [
      tailwindcss(),
      svgLoader({
        svgo: false,
      }),
    ],
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },
  typescript: {
    strict: true,
  },
  postcss: {
    plugins: {
      'postcss-nested': {},
    },
  },
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },
  gtag: {
    id: 'G-19JK9R6VDM',
  },
  sitemap: {
    excludeAppSources: true,
    sources: ['/api/sitemap'],
  },
})
