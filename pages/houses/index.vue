<template>
  <div style="width: 100vw;">
    <div class="default-page">
      <h1>{{ $t('houses') }}</h1>
      <div v-html="localPricesText"></div>
      <h1 style="margin-top:1.5em;">{{ $t('prices') }}</h1>
      <div v-html="localPricesText2"></div>
      <HousesTable />
    </div>
    <img v-if="width && prices?.foto" style="display:block"
      :src="`${config.public.directusBase}/assets/${prices.foto}?fit=cover&width=${width}&height=150&withoutEnlargement`" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const config = useRuntimeConfig()
mergeHead(i18n.locale.value, i18n.t('houses'), 'General information about our houses and prices', '')
const { data: texts } = await useTexts()
const { data: prices } = await usePrices()
const width = ref(0)
onMounted(() => {
  width.value = window.outerWidth
})

const localPricesText = computed(() => {
  if (!texts.value) return ''
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
  if (!texts.value) return ''
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
