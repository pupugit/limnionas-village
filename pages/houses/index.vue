<template>
  <div style="margin-top:120px">
    <h1>{{ $t('houses') }}</h1>
    <div v-html="localPricesText"></div>
    <HousesTable />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
await initTexts()
const texts = useTexts()
const i18n = useI18n()

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
</script>
