<template>
  <div class="tos-page" :style="calcPic">
    <div class="tos-content">
      <h1>{{ $t('tos') }}</h1>
      <div v-html="localTOSText"></div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const config = useRuntimeConfig()
const i18n = useI18n()
mergeHead(i18n.locale.value, i18n.t('tos'), 'Our terms of service', '')
await initTexts()
const texts = useTexts()
await initSpecials()
const specials = useSpecials()
const { width, height } = useWindowSize()
const calcPic = ref('')

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
onMounted(() => {
  if (!specials.value.tos || width.value === 0 || width.value === Infinity) return
  calcPic.value = `background-image: url(${config.public.directusBase}/assets/${specials.value.tos}?fit=cover&width=${width.value}&height=${height.value}&withoutEnlargement&format=${config.public.imageFormat});`
})
</script>

<style>
.tos-page {
  min-height: 100vh;
  box-sizing: border-box;
  background-attachment: fixed;
}

.tos-content {
  background: rgba(255, 255, 255, 80%);
  margin: 128px 10vw 32px 10vw;
  padding: 2rem;
}

@media screen and (max-width:600px) {
  .tos-content {
    margin: 128px 0 0 0;
    padding: 1.5rem;
  }
}
</style>