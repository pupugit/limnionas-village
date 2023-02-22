<template>
  <div class="arrival-page">
    <div class="arrival-content" style="width:100%">
      <div v-html="arrival.intro"></div>
      <div><span @click="showNorth = true"
          :style="`cursor:pointer;${showNorth ? 'background-color:var(--col-main);color:white;' : 'text-decoration:underline;'}`">{{
            $t('northern-route') }}</span>
        |
        <span @click="showNorth = false"
          :style="`cursor:pointer;${!showNorth ? 'background-color:var(--col-main);color:white;' : 'text-decoration:underline;'}`">{{
            $t('southern-route') }}</span>
      </div>
      <div id="mapbox" style="width: 100%;height:50vh;margin-top:1em;">
      </div>
      <div v-html="showNorth ? arrival.north : arrival.south"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import southernRoute from '@/assets/southernRoute.json'
// import northernRoute from '@/assets/northernRoute.json'
const config = useRuntimeConfig()
await initArrival()
const arrival = useArrival()
const showNorth = ref(false)

/*
 airport
 { lon: 26.914984778344206, lat: 37.691671384443 }
 26.914984778344206,37.691671384443

 26.967811,37.690881

 limnionas village
 { lon: 26.63102221522945, lat: 37.69445784330787 }
 26.63095129176827,37.69426001068132

 26.621206,37.691813
*/
onMounted(() => {
  if (config.public.mapboxToken && window) {
    window.setTimeout(() => {
      mapboxgl.accessToken = config.public.mapboxToken
      const map = new mapboxgl.Map({
        container: 'mapbox',
        style: 'mapbox://styles/mapbox/streets-v12',
        bounds: [{ lon: 26.611206, lat: 37.691813 }, { lon: 26.937811, lat: 37.690881 }]
      })
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: southernRoute
        }
      }
      const layer: mapboxgl.LineLayer = {
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          // @ts-ignore
          data: geojson
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      }
      map.on('load', () => {
        map.addLayer(layer);
      })

    }, 1400)
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
