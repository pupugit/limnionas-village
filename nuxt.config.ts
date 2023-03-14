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
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        typeRoots: ['./types'],
        types: ['mapbox-gl']
      }
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
  // hooks: {
  //   'vite:extendConfig'(config, { isServer }) {
  //     if (isServer) {
  //       // Workaround for netlify issue
  //       // https://github.com/nuxt/framework/issues/6204
  //       // @ts-ignore
  //       config.build.rollupOptions.output.inlineDynamicImports = true
  //     }
  //   }
  // },
})
