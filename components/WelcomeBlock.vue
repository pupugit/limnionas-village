<template>
  <div class="welcome-back first" :style="calcPic">
  </div>
  <div class="welcome-back" :style="calcBG">
    <div class="welcome-info">
      <div class="welcome-text" v-html="localWelcome" />
    </div>
  </div>
  <div class="welcome-back" :style="calcBG2">
    <div class="welcome-info">
      <div class="welcome-text" v-html="localWelcome2" />
    </div>
  </div>
  <div class="welcome-back" :style="calcBG3">
    <div class="welcome-info">
      <div class="welcome-text" v-html="localWelcome3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const config = useRuntimeConfig()
await initSpecials()
const specials = useSpecials()
const texts = useTexts()
const width = ref(0)
const height = ref(1024)
const loaded = ref(false)
const i18n = useI18n()
const localWelcome = computed(() => {
  if (i18n.locale.value === 'de' || i18n.locale.value === 'fr' || i18n.locale.value === 'en') {
    const found = texts.value.find(t => t.id === 'welcome')
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
const localWelcome2 = computed(() => {
  if (i18n.locale.value === 'de' || i18n.locale.value === 'fr' || i18n.locale.value === 'en') {
    const found = texts.value.find(t => t.id === 'welcome2')
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
const localWelcome3 = computed(() => {
  if (i18n.locale.value === 'de' || i18n.locale.value === 'fr' || i18n.locale.value === 'en') {
    const found = texts.value.find(t => t.id === 'welcome3')
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
  if (window) {
    width.value = window.innerWidth
    height.value = window.innerHeight
    loaded.value = true
  }
})
const calcPic = computed(() => {
  if (!specials.value.welcome_pic || width.value == 0) return ''
  return `background-image: url(${config.public.directusBase}/assets/${specials.value.welcome_pic}?fit=inside&width=${width.value}&height=${height.value}&withoutEnlargement&format=webp);`
})
const calcBG = computed(() => {
  if (!specials.value.welcome_back || width.value == 0) return ''
  return `background-image: url(${config.public.directusBase}/assets/${specials.value.welcome_back}?fit=cover&width=${width.value}&height=${height.value}&format=webp);`
})

const calcBG2 = computed(() => {
  if (!specials.value.welcome_back || width.value == 0) return ''
  return `background-image: url(${config.public.directusBase}/assets/${specials.value.welcome_back2}?fit=cover&width=${width.value}&height=${height.value}&format=webp);`
})
const calcBG3 = computed(() => {
  if (!specials.value.welcome_back || width.value == 0) return ''
  return `background-image: url(${config.public.directusBase}/assets/${specials.value.welcome_back3}?fit=cover&width=${width.value}&height=${height.value}&format=webp);`
})

</script>

<style>
.welcome-pic {
  height: 25vh;
  height: 25dvh;
  width: 50vw;
  width: 50dvw;
  background-position: center;
  background-repeat: no-repeat;
}

.welcome-back {
  width: 100vw;
  width: 100dvw;
  height: 100vh;
  height: 100dvh;
  display: grid;
  place-items: center;
  place-content: center;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  transition: 0.5s opacity;
  box-sizing: border-box;
}

.welcome-back.first {
  background-position-y: bottom 96px;
  background-size: auto calc(100vh - 256px);
}

.welcome-text {
  text-align: justify;
  text-align-last: left;
  padding: 32px;
}

.welcome-info {
  text-align: center;
  background-position: center;
  background-size: cover;
  background-color: rgba(255, 255, 255, var(--trans));
  border-radius: 16px;
  transition: all 0.5s ease-out;
  width: min(600px, 85vw);
  display: grid;
  place-content: center;
}

.welcome-info.big {
  width: min(800px, 100vw);
}

@media screen and (max-width: 600px) {
  .welcome-info.big {
    border-radius: 0;
  }

  .welcome-info.big .welcome-text {
    padding: 6px;
  }
}

.welcome-info:hover {
  background-color: white;
}

/* @media screen and (max-width: 400px) {
  .welcome-info {
    border-radius: 0;
    width: 100vw;
    height: unset;
    aspect-ratio: unset;
    max-width: unset;
  }
} */
</style>
