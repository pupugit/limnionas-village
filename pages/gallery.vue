<template>
  <div class="gallery-page">
    <Splide :options="{ rewind: true }" :aria-label="gallery.name" v-if="gallery.id">
      <SplideSlide v-for="p in gallery.fotos" :key="p.directus_files_id">
        <img
          :src="`${config.public.directusBase}/assets/${p.directus_files_id}?fit=inside&width=1024&height=1024&format=${config.public.imageFormat}`"
          alt="Picture">
      </SplideSlide>
    </Splide>
  </div>
</template>

<script lang="ts" setup>
import '@splidejs/vue-splide/css'
import '@splidejs/vue-splide/css/skyblue'

import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const config = useRuntimeConfig()
useHead({ title: i18n.t('gallery') })
await initGallery()
const gallery = useGallery()

</script>

<style scoped>
.gallery-page {
  min-height: 100vh;
  padding-top: 128px;
  box-sizing: border-box;
  display: grid;
  justify-content: center;
  align-content: start;
  gap: 40px;
  background-attachment: fixed;
}
</style>
