<template>
  <div class="default-page">
    <h1>{{ $t('houses') }}</h1>
    <div v-html="localPricesText"></div>
    <h1 style="margin-top:1.5em;">{{ $t('prices') }}</h1>
    <div v-html="localPricesText2"></div>
    <HousesTable :small="small" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
mergeHead(i18n.locale.value, i18n.t('houses'), 'Informationen about our houses and prices', '')
const { width, height } = useWindowSize()
const small = computed(() => {
  if (width.value !== Infinity && width.value >= 800) return false
  return true
})
await initTexts()
const texts = useTexts()


const localPricesText = computed(() => {
  if (i18n.locale.value === 'de' || i18n.locale.value === 'fr' || i18n.locale.value === 'en') {
    const found = texts.value.find(t => t.id === 'prices_text')
    if (!found) return ''
    let ret = found.content
    if (i18n.locale.value !== 'en') {
      const t = found.translations.find(trans => trans.languages_code === i18n.locale.value)
      if (t) {
        ret = t.content
      }
    }
    return ret
  }
  return ''
})
const localPricesText2 = computed(() => {
  if (i18n.locale.value === 'de' || i18n.locale.value === 'fr' || i18n.locale.value === 'en') {
    const found = texts.value.find(t => t.id === 'prices_text2')
    if (!found) return ''
    let ret = found.content
    if (i18n.locale.value !== 'en') {
      const t = found.translations.find(trans => trans.languages_code === i18n.locale.value)
      if (t) {
        ret = t.content
      }
    }
    return ret
  }
  return ''
})
</script>
