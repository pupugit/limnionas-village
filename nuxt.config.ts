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
  },
  typescript: {
    shim: false,
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
