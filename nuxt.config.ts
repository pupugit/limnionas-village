// https://v3.nuxtjs.org/api/configuration/nuxt.config
// import { resolve, dirname } from 'node:path'
// import { fileURLToPath } from 'url'
// import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineNuxtConfig({

  modules: [
    'nuxt-directus',
    '@vueuse/nuxt',
    'nuxt-swiper',
  ],
  directus: {
    url: process.env.NUXT_PUBLIC_DIRECTUS_BASE,
    autoFetch: false,
    autoRefresh: false,
  },
  typescript: {
    shim: false,
  },
  nitro: {
    prerender: {
      ignore: [
        '/%23a',
        '/%23b',
        '/%2523a',
        '/%2523b'
      ]
    }
  },
  runtimeConfig: {
    public: {
      directusBase: '',
      imageFormat: 'webp',
      featureZen: false,
      mapboxToken: '',
    }
  },
  app: {
    pageTransition: {
      name: 'page', mode: 'out-in'
    },
  },
  vite: {
    build: {
      target: "esnext",
    },
  },
})
