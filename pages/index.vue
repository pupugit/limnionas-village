<template>
  <div id="grid-index" class="grid-index" @scroll="onScroll">
    <WelcomeBlock />
    <HouseBlock v-for="house in localeHouses" :house="house" :key="house.id" />
    <ArticleBlock v-for="article in localeArticles" :article="article" :key="article.id" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
useHead({ title: 'Limnionas Village' })
const bgStyle = useBackgroundImageState()
bgStyle.value = ''
await initHousesBasic()
await initTexts()
await initArticles()
const houses = useHousesBasic()
const articles = useArticles()
const scrollState = useScrollState()
const onScroll = (e) => {
  scrollState.value.scrollPos = e.target.scrollTop
  if (e.target.scrollTop > 200) scrollState.value.isScrolled = true
  else scrollState.value.isScrolled = false
}
onMounted(async () => {
  console.log('mounted')
  window.setTimeout(() => {
    const gEl = document.getElementById('grid-index')
    console.log(gEl, scrollState.value.scrollPos)
    if (gEl) gEl.scrollTo(0, scrollState.value.scrollPos)
  }, 450)
})
onBeforeUnmount(() => { scrollState.value.isScrolled = false })

const i18n = useI18n()
const localeHouses = computed(() => {
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
const localeArticles = computed(() => {
  if (i18n.locale.value === 'de' || i18n.locale.value === 'fr' || i18n.locale.value === 'en') {
    return articles.value.map((a) => {
      const ret = Object.assign({}, a)
      ret.sections = []
      a.sections.forEach((s) => {
        if (i18n.locale.value !== 'en') {
          const t = s.translations.find(trans => trans.languages_code === i18n.locale.value)
          if (t && t.content?.length) {
            ret.sections.push({
              id: s.id,
              name: s.name,
              image_back: s.image_back,
              content: t.content,
              translations: []
            })
          }
        } else if (s.content?.length) {
          ret.sections.push({
            id: s.id,
            name: s.name,
            image_back: s.image_back,
            content: s.content,
            translations: []
          })
        }
      })
      return ret
    }).filter(a => a.sections.length)
  }
  return []
})
</script>

<style lang="scss">
.grid-index {
  display: grid;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  scrollbar-width: thin;
  overflow-x: clip;
  height: 100vh;
  height: 100dvh;

  &>div {
    scroll-snap-align: start;
    height: 100vh;
    height: 100dvh;
    display: grid;
    place-content: center;
  }

}
</style>
