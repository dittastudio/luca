import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en-GB',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'author', content: 'Luca' },
        { name: 'revisit-after', content: '1 day' },
        { name: 'msapplication-TileColor', content: '#2D3F2F' },
        { name: 'theme-color', content: '#2D3F2F' },
        { name: 'google', content: 'notranslate' },
        { 'http-equiv': 'content-language', 'content': 'en-GB' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://a2.storyblok.com' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        {
          rel: 'preload',
          type: 'font/woff2',
          href: '/fonts/Magister-Regular.woff2',
          as: 'font',
          crossorigin: '',
        },
        {
          rel: 'preload',
          type: 'font/woff2',
          href: '/fonts/Magister-Italic.woff2',
          as: 'font',
          crossorigin: '',
        },
        {
          rel: 'preload',
          type: 'font/woff2',
          href: '/fonts/Sebenta-Medium.woff2',
          as: 'font',
          crossorigin: '',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: false,
  },
  components: true,
  css: process.env.LOCAL === 'true' ? ['@michaelpumo/screen/app.css'] : [],
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },
  gtag: {
    id: '',
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
    private: {},
    public: {
      SSR: process.env.NUXT_SSR,
      STORYBLOK_TOKEN: process.env.NUXT_STORYBLOK_TOKEN,
      STORYBLOK_VERSION: process.env.NUXT_STORYBLOK_VERSION,
    },
  },
  site: {
    url: 'https://luca.restaurant',
  },
  ssr: process.env.NUXT_SSR === 'true',
  tailwindcss: {
    cssPath: '@/assets/css/app.css',
  },
  typescript: {
    strict: true,
  },
  vite: {
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
