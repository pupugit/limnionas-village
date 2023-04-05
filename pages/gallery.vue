<template>
  <div class="gallery-page">
    <swiper @swiper="setThumbsSwiper" :loop="true" :spaceBetween="10" slidesPerView="auto" :freeMode="true"
      :modules="modules" class="mySwiper" v-if="gallery.id">
      <swiper-slide v-for="p in gallery.fotos" :key="p.directus_files_id">
        <img
          :src="`${config.public.directusBase}/assets/${p.directus_files_id}?fit=inside&width=1024&height=1024&format=${config.public.imageFormat}`"
          alt="Picture" loading="lazy">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import type { Swiper } from 'swiper'
import { useI18n } from 'vue-i18n'
import { FreeMode, Navigation, Thumbs } from 'swiper'

const i18n = useI18n()
const config = useRuntimeConfig()
mergeHead(i18n.locale.value, i18n.t('gallery'), 'Eine kleine Fototour', '')
await initGallery()
const gallery = useGallery()

let thumbsSwiper = null;

const setThumbsSwiper = (swiper: Swiper) => {
  thumbsSwiper = swiper
}
const modules = [FreeMode]
</script>

<style>
.gallery-page {
  min-height: 100vh;
  padding-top: 128px;
  box-sizing: border-box;
  display: grid;
  justify-content: center;
  align-content: stretch;
  gap: 40px;
  background-attachment: fixed;
}
</style>
