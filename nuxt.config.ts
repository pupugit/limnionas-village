// https://v3.nuxtjs.org/api/configuration/nuxt.config
// import { resolve, dirname } from 'node:path'
// import { fileURLToPath } from 'url'
// import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  modules: [
    'nuxt-directus',
    '@vueuse/nuxt',
    'nuxt-icon',
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(
          vuetify(),
        )
      })
    }],
  vite: {
    ssr: {
      noExternal: ['vuetify'], // add the vuetify vite plugin
    },
  },
  directus: {
    url: process.env.NUXT_PUBLIC_DIRECTUS_BASE,
  },
  typescript: { shim: false },
  runtimeConfig: {
    public: {
      directusBase: process.env.NUXT_PUBLIC_DIRECTUS_BASE || ''
    }
  },
  app: {
    pageTransition: {
      name: 'page', mode: 'out-in'
    },
  },
  hooks: {
    'vite:extendConfig'(config, { isServer }) {
      if (isServer) {
        // Workaround for netlify issue
        // https://github.com/nuxt/framework/issues/6204
        // @ts-ignore
        config.build.rollupOptions.output.inlineDynamicImports = true
      }
    }
  },
})
