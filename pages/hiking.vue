<template>
  <div class="hikes-page" v-if="width && hikes">
    <div v-for="(h, idx) in hikes" :key="h.id" class="hikes-section"
      :style="h.fotos.length ? `background-image: url(${config.public.directusBase}/assets/${h.fotos[0].directus_files_id}?fit=cover&width=${width}&height=${height}&withoutEnlargement&format=${config.public.imageFormat});` : ''">
      <div class="hikes-content" :style="idx === 0 ? 'margin-top:128px;' : ''">
        <h1>{{ h.title }}</h1>
        <div v-html="h.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
mergeHead(i18n.locale.value, i18n.t('hiking'), 'Hiking paths around Limnionas Village', '')
const config = useRuntimeConfig()
const { data: hikes } = await useHikes()
const width = ref(0)
const height = ref(0)
onMounted(() => {
  width.value = window.outerWidth
  height.value = window.outerHeight
})
// const { width, height } = useWindowSize()
</script>

<style>
.hikes-page {
  box-sizing: border-box;
}

.hikes-section {
  display: grid;
  place-content: center;
  width: 100vw;
  min-height: 100vh;
  min-height: 100lvh;
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: white;
}

.hikes-content {
  background: rgba(255, 255, 255, 80%);
  box-sizing: border-box;
  width: min(1000px, 85vw);
  padding: 2rem;
  margin: 10vw 0;
  align-self: start;
  justify-self: center;
}
</style>
