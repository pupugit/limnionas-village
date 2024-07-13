<template>
  <div v-if="specials">
    <div class="welcome-first" :style="calcPic"
      @click.self="config.public.featureZen ? zenMode = !zenMode : zenMode = zenMode" ref="infoEl">
    </div>
    <WelcomeEntry :entry="localWelcome" :pic="specials.welcome_back" />
    <WelcomeEntry :entry="localWelcome2" :pic="specials.welcome_back2" />
    <WelcomeEntry :entry="localWelcome3" :pic="specials.welcome_back3" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const config = useRuntimeConfig()
const { data: specials } = await useSpecials()
const { data: texts } = await useTexts()
const i18n = useI18n()
const zenMode = useZenMode()
const infoEl = ref<HTMLElement | null>(null)
const width = ref(0)
const height = ref(0)

onMounted(() => {
  if (window) {
    width.value = window.outerWidth
    height.value = window.outerHeight
  }
})
const localWelcome = computed(() => {
  if (!texts.value) return ''
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
  if (!texts.value) return ''
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
  if (!texts.value) return ''
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
const calcPic = computed(() => {
  if (!specials?.value?.welcome_pic || !width.value || !infoEl.value) return ''
  return `background-image: url(${config.public.directusBase}/assets/${specials.value.welcome_pic}?fit=inside&width=${width.value}&height=${height.value}&withoutEnlargement&format=${config.public.imageFormat});`
})

</script>

<style>
.grid-index div.welcome-other {
  width: 100vw;
  height: 100vh;
  display: grid;
  background-position: center top;
  background-repeat: no-repeat;
  transition: 0.5s opacity;
  box-sizing: border-box;
  grid-template-rows: 1fr auto;
  justify-content: stretch;
  align-content: end;
  grid-template-areas: 'top' 'bottom';

}

.welcome-other.zen-mode>div,
.welcome-other.zen-mode>svg {
  visibility: hidden;
  opacity: 0;
}

.welcome-first {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  place-content: center;
  background-position: center;
  background-repeat: no-repeat;
  transition: 0.5s opacity;
  box-sizing: border-box;
  background-position-y: bottom 96px;
  background-size: auto calc(100vh - 256px);
}

.welcome-pic {
  width: 100%;
  height: 100%;
  grid-area: top;
}

.welcome-wave {
  grid-area: top;
  place-self: end;
  height: 50px;
  width: 100vw;
}

.welcome-text {
  text-align: justify;
  text-align-last: auto;
  box-sizing: border-box;
  padding: 16px;
  width: min(720px, 100vw);
}

.welcome-info {
  grid-area: bottom;
  text-align: center;
  background-color: white;
  transition: all 0.5s ease-out;
  display: grid;
  place-content: center;
  margin-top: -1px;

}


@media screen and (max-width: 600px) {
  .welcome-info.big {
    border-radius: 0;
  }

  .welcome-info.big .welcome-text {
    padding: 6px;
  }
}
</style>
