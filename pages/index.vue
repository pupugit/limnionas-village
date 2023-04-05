<template>
  <div id="grid-index" class="grid-index">
    <WelcomeBlock />
    <div style="width:100vw;height:100vh;">
      <iframe allowfullscreen loading="lazy" ref="vimeo"
        src="https://player.vimeo.com/video/785195296?h=51b039a95d&portrait=0&title=0"
        style="width: 100vw;max-height:100vh;aspect-ratio: 16/9;" title="vimeo-player" frameborder="0"></iframe>
    </div>
    <HouseBlock v-for="house in localeHouses" :house="house" :key="house.id" />
    <AboutUsBlock v-if="localeAboutUs" :about-us="localeAboutUs" :show-little-travel-society="curLang === 'de'" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
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
      content: 'Eingebettet in einem alten, weitläufigen Olivenhain, direkt am Meer, liegt unser kleines, im Kykladenstil erbautes Feriendorf Limnionas Village.',
    },
    {
      hid: 'og:title',
      name: 'og:title',
      property: 'og:title',
      content: 'Herzlich Willkommen! - Limnionas Village',
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
      content: 'Eingebettet in einem alten, weitläufigen Olivenhain, direkt am Meer, liegt unser kleines, im Kykladenstil erbautes Feriendorf Limnionas Village.',
    }],
})
definePageMeta({
  pageTransition: false
})
const bgStyle = useBackgroundImageState()
bgStyle.value = ''

await initHousesBasic()
await initTexts()
//await initArticles()
await initAboutUs()
const houses = useHousesBasic()
// const articles = useArticles()
// const scrollState = useScrollState()
const aboutUs = useAboutUs()
const vimeo = ref()

/* onMounted(() => {
  if (scrollState.value.scrollPos > 0) {
    window.setTimeout(() => {
      //console.log('index: scrolling to ', scrollState.value.scrollPos)
      window.scrollTo(0, scrollState.value.scrollPos)
    }, 1200)
  }
}) */


const curLang = i18n.locale
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

const localeAboutUs = computed(() => {
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

// const localeArticles = computed(() => {
//   if (i18n.locale.value === 'de' || i18n.locale.value === 'fr' || i18n.locale.value === 'en') {
//     return articles.value.map((a) => {
//       const ret = Object.assign({}, a)
//       ret.sections = []
//       a.sections.forEach((s) => {
//         if (i18n.locale.value !== 'en') {
//           const t = s.translations.find(trans => trans.languages_code === i18n.locale.value)
//           if (t && t.content?.length) {
//             ret.sections.push({
//               id: s.id,
//               name: s.name,
//               image_back: s.image_back,
//               content: t.content,
//               translations: []
//             })
//           }
//         } else if (s.content?.length) {
//           ret.sections.push({
//             id: s.id,
//             name: s.name,
//             image_back: s.image_back,
//             content: s.content,
//             translations: []
//           })
//         }
//       })
//       return ret
//     }).filter(a => a.sections.length)
//   }
//   return []
// })
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
