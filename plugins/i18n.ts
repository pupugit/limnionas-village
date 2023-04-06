import { createI18n } from 'vue-i18n'
import en from '~/locales/en.json'
import de from '~/locales/de.json'
import fr from '~/locales/fr.json'
const numberFormats = {
  'en': {
    currency: {
      style: 'currency',
      currency: 'EUR',
      notation: 'standard',
      maximumFractionDigits: 0
    }
  },
  'de': {
    currency: {
      style: 'currency',
      currency: 'EUR',
      notation: 'standard',
      maximumFractionDigits: 0,
    }
  },
  'fr': {
    currency: {
      style: 'currency',
      currency: 'EUR',
      notation: 'standard',
      maximumFractionDigits: 0
    }
  }
}
const datetimeFormats = {
  'en': {
    text_short_no_month: {
      year: undefined, month: 'short', day: 'numeric',
    },
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
  },
  'de': {
    text_short_no_month: {
      year: undefined, month: 'short', day: 'numeric',
    },
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
  },
  'fr': {
    text_short_no_month: {
      year: undefined, month: 'short', day: 'numeric',
    },
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
  },
}
export default defineNuxtPlugin(({ vueApp, hook }) => {
  /* @ts-ignore */
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    datetimeFormats,
    numberFormats,
    messages: {
      en,
      de,
      fr,
    }
  })
  vueApp.use(i18n)
})
