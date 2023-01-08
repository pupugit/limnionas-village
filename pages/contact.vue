<template>
  <div class="contact-page" :style="calcPic">
    <div class="contact-content">
      <h1>{{ $t('contact') }}</h1>
      <div v-html="localContactText"></div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const config = useRuntimeConfig()
const i18n = useI18n()
useHead({ title: i18n.t('tos') })
await initTexts()
const texts = useTexts()
await initSpecials()
const specials = useSpecials()
const { width, height } = useWindowSize()

const calcPic = ref('')

const localContactText = computed(() => {
  if (i18n.locale.value === 'de' || i18n.locale.value === 'fr' || i18n.locale.value === 'en') {
    const found = texts.value.find(t => t.id === 'contact')
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
  if (!specials.value.contact || width.value === 0 || width.value === Infinity) return
  calcPic.value = `background-image: url(${config.public.directusBase}/assets/${specials.value.contact}?fit=cover&width=${width.value}&height=${height.value}&withoutEnlargement&format=webp);`
})

</script>

<style>
.contact-page {
  min-height: 100vh;
  box-sizing: border-box;
  background-attachment: fixed;
}

.contact-content {
  background: rgba(255, 255, 255, 80%);
  margin: 128px 10vw 32px 10vw;
  padding: 2rem;
}
</style>
