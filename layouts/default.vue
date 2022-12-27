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
const bgStyle = useBackgroundImageState()
router.afterEach(() => {
  bgStyle.value = ''
})
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
</script>
