<template>
  <div id="grid-index" class="grid-index">
    <WelcomeBlock />
    <div style="width:100vw;height:100vh;">
      <iframe allowfullscreen loading="lazy" ref="vimeo"
        :src="`https://player.vimeo.com/video/${config.public.vimeoPart1}?h=${config.public.vimeoPart2}&portrait=0&title=0`"
        style="width: 100vw;max-height:100vh;aspect-ratio: 16/9;" title="vimeo-player" frameborder="0"></iframe>
    </div>
    <HouseBlock v-for="house in localeHouses" :house="house" :key="house.id" />
    <AboutUsBlock v-if="localeAboutUs" :about-us="localeAboutUs" :show-little-travel-society="curLang === 'de'" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const config = useRuntimeConfig()
mergeHead(i18n.locale.value, '', '', '')
definePageMeta({
  pageTransition: false
})
const bgStyle = useBackgroundImageState()
bgStyle.value = ''

const { data: houses } = await useHousesBasic()
const { data: aboutUs } = await useAboutUs()
const vimeo = ref()

const curLang = i18n.locale
const localeHouses = computed(() => {
  if (!houses.value) return []
  if (i18n.locale.value === 'de' || i18n.locale.value === 'fr' || i18n.locale.value === 'en') {
    return houses.value.map((h) => {
      const ret = Object.assign({}, h)
      ret.translations = []
      if (i18n.locale.value !== 'en') {
        const t = h.translations.find(trans => trans.languages_id === i18n.locale.value)
        if (t) {
          ret.name = t.name
          ret.short = t.short
        }
      }
      return ret
    })
  }
  return []
})

const localeAboutUs = computed(() => {
  if (!aboutUs.value) return null
  if (i18n.locale.value === 'de' || i18n.locale.value === 'fr' || i18n.locale.value === 'en') {
    const ret = Object.assign({}, aboutUs.value)
    ret.translations = []
    if (i18n.locale.value !== 'en') {
      const t = aboutUs.value.translations.find(trans => trans.languages_code === i18n.locale.value)
      if (t) {
        ret.content = t.content
      }
    }
    return ret
  }
  return null
})

</script>

<style lang="scss">
.grid-index {
  display: grid;
  min-height: 100vh;
  // min-height: 100dvh;

  &>div {
    //    scroll-snap-align: start;
    min-height: 100vh;
    // min-height: 100dvh;
    display: grid;
    place-content: center;
  }

}
</style>