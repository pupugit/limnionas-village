<template>
  <div class="default-page">
    <h1>{{ $t('tos') }}</h1>
    <div v-html="localTOSText" class="houses-text"></div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
await initTexts()
const texts = useTexts()


const localTOSText = computed(() => {
  if (i18n.locale.value === 'de' || i18n.locale.value === 'fr' || i18n.locale.value === 'en') {
    const found = texts.value.find(t => t.id === 'imprint')
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
