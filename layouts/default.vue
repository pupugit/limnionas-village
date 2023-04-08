<template>
  <div class="layout" :style="bgStyle">
    <LimvilNav />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const prefLangs = usePreferredLanguages()
const router = useRouter()
const route = useRoute()
const bgStyle = useBackgroundImageState()
router.afterEach(() => {
  bgStyle.value = ''
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
  }, 100)
})
</script>
