<template>
  <div class="gallery-page" v-if="gallery">
    <swiper @swiper="setThumbsSwiper" :loop="true" :spaceBetween="10" slidesPerView="auto" :speed="10000" :freeMode="{
      enabled: true,
      sticky: false
    }" :autoplay="{
      delay: 100,
      disableOnInteraction: true
    }" :modules="modules" class="mySwiper" v-if="gallery.id">
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
import { FreeMode, Autoplay } from 'swiper/modules'

const i18n = useI18n()
const config = useRuntimeConfig()
mergeHead(i18n.locale.value, i18n.t('gallery'), 'Some impressions of Limnionas Village', '')
const { data: gallery } = await useGallery()

let thumbsSwiper = null;

const setThumbsSwiper = (swiper: Swiper) => {
  thumbsSwiper = swiper
}
const modules = [FreeMode, Autoplay]
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
