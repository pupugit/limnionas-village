import { createVuetify } from 'vuetify'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    defaults: {
      VTextField: {
        variant: 'outlined'
      }
    },
    theme: {
      defaultTheme: 'light'
    }
  })
  nuxtApp.vueApp.use(vuetify)
})
