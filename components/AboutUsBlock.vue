<script setup lang="ts">
import type { AboutUs } from "~~/types/aboutUs"

const config = useRuntimeConfig()
const props = defineProps<{
  aboutUs: AboutUs,
}>()
const { width, height } = useWindowSize()
const zenMode = useZenMode()

</script>

<template>
  <ClientOnly>
    <div v-if="width" :class="`about-us-bg`"
      :style="`background-image: url(${config.public.directusBase}/assets/${aboutUs.background}?fit=cover&width=${width}&height=${height}&format=${config.public.imageFormat})`">
      <div class="about-us-content" v-html="aboutUs.content">
      </div>
    </div>
    <div v-for="(f, idx) in aboutUs.fotos" v-if="width" :key="idx"
      :style="`width: 100vw;height:100vh;background-image: url(${config.public.directusBase}/assets/${f.directus_files_id}?fit=cover&width=${width}&height=${height}&format=${config.public.imageFormat})`">
    </div>
  </ClientOnly>
</template>

<style>
.about-us-bg {
  scroll-snap-align: unset;
  background-attachment: fixed;
}

.about-us-content {
  background: rgba(255, 255, 255, 80%);
  margin: 128px 10vw 32px 10vw;
  padding: 2rem;
}

@media screen and (max-width:600px) {
  .about-us-content {
    margin: 128px 0 32px 0;
    padding: 1.5rem;
  }
}
</style>
