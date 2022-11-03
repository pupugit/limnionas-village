<template>
  <div class="layout" :style="bgStyle">
    <slot />
    <LimvilNav />
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

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})

onMounted(() => {
  window.setTimeout(() => {
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
    }
    useHead({
      htmlAttrs: {
        lang: locale.value
      }
    })
  }, 500)
})

const bgStyle = useBackgroundImageState()
useHead({
  title: 'Limnionas Village',
  link: [{
    rel: 'icon',
    href: 'https://officefit.amati.solutions/favicon.ico',
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
      content: 'Welcome!',
    },
    {
      hid: 'og:site_name',
      name: 'og:site_name',
      content: 'Limnionas Village',
    },
    {
      hid: 'og:image',
      name: 'og:image',
      content: 'https://officefit.amati.solutions/limvil-picture.png',
    },
    {
      hid: 'og:description',
      name: 'og:description',
      content: 'Our small Cycladic style holiday village Limnionas Village is embedded in a spacious old olive grove directly beside the sea.',
    }],
})
</script>
