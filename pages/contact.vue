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
mergeHead(i18n.locale.value, i18n.t('contact'), 'Feel free to contact us via email, however we are best reached by phone.', '')
const { data: texts } = useTexts()
await initSpecials()
const specials = useSpecials()
const { width, height } = useWindowSize()

const calcPic = ref('')

const localContactText = computed(() => {
  if (!texts.value) return ''
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
  calcPic.value = `background-image: url(${config.public.directusBase}/assets/${specials.value.contact}?fit=cover&width=${width.value}&height=${height.value}&withoutEnlargement&format=${config.public.imageFormat});`
})

</script>

<style>
.contact-page {
  min-height: 100vh;
  box-sizing: border-box;
  background-attachment: fixed;
  display: grid;
}

.contact-content {
  background: rgba(255, 255, 255, 80%);
  margin: 128px 10vw 32px 10vw;
  padding: 2rem;
  max-width: 600px;
  align-self: start;
  justify-self: center;
}

.contact-form {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px
}

.contact-secondline {
  grid-column: 1/-1;
}

.contact-form label {
  font-weight: bold;
}

label.required:after {
  content: " *";
  color: red;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
}

@media screen and (max-width:600px) {
  .contact-content {
    margin: 128px 0 32px 0;
    padding: 1.5rem;
  }
}
</style>
