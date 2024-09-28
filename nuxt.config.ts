import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en-GB',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'author', content: 'LUCA' },
        { name: 'revisit-after', content: '1 day' },
        { name: 'msapplication-TileColor', content: '#2D3F2F' },
        { name: 'theme-color', content: '#2D3F2F' },
        { name: 'google', content: 'notranslate' },
        { 'http-equiv': 'content-language', 'content': 'en-GB' },
      ],
      link: [
        // https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs#the-ultimate-favicon-setup
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://a2.storyblok.com' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preload', type: 'font/woff2', href: '/fonts/Magister-Regular.woff2', as: 'font', crossorigin: '' },
        { rel: 'preload', type: 'font/woff2', href: '/fonts/Magister-Italic.woff2', as: 'font', crossorigin: '' },
        { rel: 'preload', type: 'font/woff2', href: '/fonts/Sebenta-Medium.woff2', as: 'font', crossorigin: '' },
      ],
    },
    pageTransition: { name: 'fade', mode: 'out-in' },
    layoutTransition: false,
  },
  compatibilityDate: '2024-07-03',
  components: true,
  css: process.env.NUXT_STORYBLOK_VERSION === 'draft' ? ['@michaelpumo/screen/app.css'] : [],
  devtools: { enabled: true },
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },
  gtag: {
    id: 'G-19JK9R6VDM',
  },
  hooks: {
    'vite:extendConfig': (config, { isClient }) => {
      if (isClient) {
        if (config.resolve?.alias) {
          config.resolve.alias.vue = 'vue/dist/vue.esm-bundler'
        }
      }
    },
  },
  image: {
    provider: 'storyblok',
    storyblok: {
      baseURL: 'https://a.storyblok.com',
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
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
    ['@storyblok/nuxt', { accessToken: process.env.NUXT_STORYBLOK_TOKEN }],
    'nuxt-gtag',
  ],
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      'tailwindcss': {},
      'autoprefixer': {},
    },
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
  site: {
    url: 'https://luca.restaurant',
    name: 'Luca',
  },
  sitemap: {
    sources: ['/api/sitemap'],
  },
  ssr: true,
  tailwindcss: {
    cssPath: '@/assets/css/app.css',
  },
  typescript: {
    strict: true,
  },
  vite: {
    resolve: {
      dedupe: [
        'vue',
      ],
    },
    plugins: [
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
})
