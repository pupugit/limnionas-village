<template>
  <div class="layout" :style="bgStyle">
    <LimvilNav />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
// const scrollState = useScrollState()
// const wScroll = useWindowScroll()
// const onScroll = (e) => {
//   scrollState.value.scrollPos = e.target.scrollTop
//   if (e.target.scrollTop > 200) scrollState.value.isScrolled = true
//   else scrollState.value.isScrolled = false
// }
const router = useRouter()
const route = useRoute()
const bgStyle = useBackgroundImageState()
router.afterEach(() => {
  bgStyle.value = ''
})
useHead({
  htmlAttrs: {
    lang: locale.value
  },
  title: route.meta.title ? `${route.meta.title} - Limnionas Village` : 'Limnionas Village',
  link: [{
    rel: 'icon',
    href: 'https://limnionas.netlify.app/favicon.ico',
    type: 'image/x-icon'
  }],
  meta: [{
    property: 'description',
    content: String(route.meta.description) || 'Eingebettet in einem alten, weitläufigen Olivenhain, direkt am Meer, liegt unser kleines, im Kykladenstil erbautes Feriendorf Limnionas Village.',
  }, {
    property: 'og:site_name',
    content: 'Limnionas Village',
  }, {
    property: 'og:title',
    content: route.meta.title ? `${route.meta.title} - Limnionas Village` : 'Limnionas Village',
  }, {
    property: 'og:image',
    content: String(route.meta.image) || 'https://limnionas.netlify.app/limvil-picture.png'
  }, {
    property: 'og:image:height',
    content: '350',
  }, {
    property: 'og:image:width',
    content: '350',
  }, {
    property: 'og:description',
    content: String(route.meta.description) || 'Eingebettet in einem alten, weitläufigen Olivenhain, direkt am Meer, liegt unser kleines, im Kykladenstil erbautes Feriendorf Limnionas Village.',
  }]
})

onMounted(() => {
  const prefLangs = usePreferredLanguages()
  for (const l of prefLangs.value) {
    if (l.includes('de')) {
      locale.value = 'de'
      break
    }
    if (l.includes('fr')) {
      locale.value = 'fr'
      break
    }
    locale.value = 'en'
  }
  useHead({
    htmlAttrs: {
      lang: locale.value
    }
  })
})
</script>
