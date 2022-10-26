<template>
  <div class="layout" :style="bgStyle">
    <LimvilNav />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { usePreferredLanguages } from '@vueuse/core';
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()


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
  }
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
