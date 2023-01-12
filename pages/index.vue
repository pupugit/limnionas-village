<template>
  <div id="grid-index" class="grid-index">
    <WelcomeBlock />
    <HouseBlock v-for="house in localeHouses" :house="house" :key="house.id" />
    <AboutUsBlock :about-us="aboutUs" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
useHead({
  title: 'Limnionas Village',
  link: [{
    rel: 'icon',
    href: 'https://limnionas.netlify.app/favicon.ico',
    type: 'image/x-icon'
  }],
  meta:
    [{
      hid: 'description',
      name: 'description',
      content: 'Our small Cycladic style holiday village Limnionas Village is embedded in a spacious old olive grove directly beside the sea.',
    },
    {
      hid: 'og:title',
      name: 'og:title',
      property: 'og:title',
      content: 'Welcome!',
    },
    {
      hid: 'og:site_name',
      name: 'og:site_name',
      property: 'og:site_name',
      content: 'Limnionas Village',
    },
    {
      hid: 'og:image',
      name: 'og:image',
      property: 'og:image',
      content: 'https://limnionas.netlify.app/limvil-picture.png',
    },
    {
      hid: 'og:description',
      name: 'og:description',
      property: 'og:description',
      content: 'Our small Cycladic style holiday village Limnionas Village is embedded in a spacious old olive grove directly beside the sea.',
    }],
})
const bgStyle = useBackgroundImageState()
bgStyle.value = ''

await initHousesBasic()
await initTexts()
await initArticles()
await initAboutUs()
const houses = useHousesBasic()
const articles = useArticles()
const scrollState = useScrollState()
const aboutUs = useAboutUs()

onMounted(async () => {
  if (scrollState.value.scrollPos > 0) {
    window.setTimeout(() => {
      //console.log('index: scrolling to ', scrollState.value.scrollPos)
      window.scrollTo(0, scrollState.value.scrollPos)
    }, 1200)
  }
})

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
  min-height: 100vh;
  // min-height: 100dvh;

  &>div {
    scroll-snap-align: start;
    min-height: 100vh;
    // min-height: 100dvh;
    display: grid;
    place-content: center;
  }

}
</style>
