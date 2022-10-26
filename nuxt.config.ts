// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineNuxtConfig({
  modules: ['nuxt-directus', '@vueuse/nuxt', 'nuxt-icon'],
  directus: {
    url: process.env.NUXT_PUBLIC_DIRECTUS_BASE,
  },
  typescript: { shim: false },
  runtimeConfig: {
    public: {
      directusBase: process.env.NUXT_PUBLIC_DIRECTUS_BASE || ''
    }
  },
  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json')
        ]
      })
    ]
  }
})
