<script setup lang="ts">
import type { AboutUs } from "~/types/aboutUs"

const config = useRuntimeConfig()
const props = defineProps<{
  aboutUs: AboutUs,
  showLittleTravelSociety?: boolean
}>()
const { width, height } = useWindowSize()
const zenMode = useZenMode()

</script>

<template>
  <ClientOnly>
    <div>
      <div v-if="width" :class="`about-us-bg`"
        :style="`background-image: url(${config.public.directusBase}/assets/${aboutUs.background}?fit=cover&width=${width}&height=${height}&format=${config.public.imageFormat})`">
        <div class="about-us-content">
          <div v-html="aboutUs.content"></div>
          <div style="display:grid;justify-content: end;" v-if="showLittleTravelSociety">
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
        :style="`${idx !== 0 ? 'scroll-snap-align: start;' : ''}background-image: url(${config.public.directusBase}/assets/${f.directus_files_id}?fit=cover&width=${width}&height=${height}&format=${config.public.imageFormat})`">
      </div>
    </div>
  </ClientOnly>
</template>

<style>
.little-travel {
  display: table;
}

.little-travel>* {
  padding: .5ex;
  border: 1px solid #ccc;
  background: #f3f3f3;
  display: block;
  max-width: 100%;
}

.little-travel>figcaption {
  padding-top: .5ex;
  text-align: center;
  border: 1px solid #ccc;
  border-top-color: rgb(204, 204, 204);
  border-top-style: solid;
  border-top-width: 1px;
  border-top: 0;
  font-size: small;
  display: table-caption;
  max-width: none;
  caption-side: bottom;
}

.about-us-bg {
  background-attachment: fixed;
  min-height: 100vh;
}

.about-us-foto {
  width: 100vw;
  height: 100vh;
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
