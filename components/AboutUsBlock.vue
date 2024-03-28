<script setup lang="ts">
import type { AboutUs } from "~/types/aboutUs"

const config = useRuntimeConfig()
const props = defineProps<{
  aboutUs: AboutUs,
  showLittleTravelSociety?: boolean
}>()
const width = ref(0)
const height = ref(0)
const zenMode = useZenMode()

onMounted(() => {
  if (window) {
    width.value = window.outerWidth
    height.value = window.outerHeight
  }
})

</script>

<template>
  <div style="scroll-snap-align: start;">
    <div v-if="width" :class="`about-us-bg`"
      :style="`background-image: url(${config.public.directusBase}/assets/${aboutUs.background}?fit=cover&width=${width}&height=${height}&format=${config.public.imageFormat})`">
      <div class="about-us-content">
        <div v-html="aboutUs.content"></div>
        <div v-if="showLittleTravelSociety">
          <figure role="group" class="little-travel">
            <a href="https://www.littletravelsociety.de/urlaubsziele/limnionas-village-samos-griechenland/"><img
                alt="Logo Little Travel Society" data-entity-type="file"
                data-entity-uuid="d623f46d-89f0-418a-b4c7-b1f078153e72" src="/Little_Travel_Society_Link.png"
                width="200"></a>
            <figcaption>Wir freuen uns über die Zusammenarbeit mit Little Travel Society!</figcaption>
          </figure>
        </div>
      </div>
    </div>
    <div v-for="(f, idx) in aboutUs.fotos" v-if="width" :key="idx" class="about-us-foto"
      :style="`background-image: url(${config.public.directusBase}/assets/${f.directus_files_id}?fit=cover&width=${width}&height=${height}&format=${config.public.imageFormat})`">
    </div>
  </div>
</template>

<style>
.little-travel {
  display: table;
  margin: 1.5em 0 0 0;
}

.little-travel>* {
  padding: .5ex .5ex .5ex 0;
  display: block;
  max-width: 100%;
}

.little-travel>figcaption {
  padding-top: .5ex .5ex .5ex 0;
  text-align: center;
  font-size: small;
  display: table-caption;
  max-width: none;
  caption-side: bottom;
}

.about-us-bg {
  background-attachment: fixed;
  min-height: 100lvh;
}

.about-us-foto {
  width: 100lvw;
  height: 100lvh;
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