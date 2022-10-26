<template>
  <div id="grid-index" class="grid-index" @scroll="onScroll">
    <WelcomeBlock />
    <HouseBlock v-for="house in localeHouses" :house="house" :key="house.id" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
useHead({ title: 'Limnionas Village' })
const bgStyle = useBackgroundImageState()
bgStyle.value = ''
const houses = useHouses()
const isScrolled = useScrollState()
const onScroll = (e) => {
  if (e.target.scrollTop > 200) isScrolled.value = true
  else isScrolled.value = false
}

onBeforeUnmount(() => { isScrolled.value = false })

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
          ret.description = t.description
          ret.furnishing = t.furnishing
          ret.short = t.short
        }
      }
      return ret
    })
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
