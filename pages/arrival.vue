<template>
  <div class="arrival-page">
    <div class="arrival-content" style="width:100%">
      Other things
      <div id="mapbox" style="width: 100%;height:40vh;">
      </div>
      Other stuff
    </div>
  </div>
</template>

<script setup lang="ts">
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
const config = useRuntimeConfig()
onMounted(() => {
  if (config.public.mapboxToken) {
    mapboxgl.accessToken = config.public.mapboxToken
    const map = new mapboxgl.Map({
      container: 'mapbox',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: { lon: 26.63102221522945, lat: 37.69445784330787 },
      zoom: 13
    })
  }

})
</script>

<style>
.arrival-page {
  min-height: 100vh;
  box-sizing: border-box;
  background-attachment: fixed;
  display: grid;
}

.arrival-content {
  background: rgba(255, 255, 255, 80%);
  margin: 128px 10vw 32px 10vw;
  padding: 2rem;
  max-width: 1000px;
  align-self: start;
  justify-self: center;
}
</style>