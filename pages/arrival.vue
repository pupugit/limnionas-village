<template>
  <div class="arrival-page">
    <div class="arrival-content">
      <div v-if="localeArrival" v-html="localeArrival.intro"></div>
      <div v-if="loadingWeather">{{ $t('loading_weather') }}</div>
      <div v-else-if="weatherData" class="weather-data">
        <div>{{ $t('weather_at_limnionas') }}</div>
        <img :src="weatherData.info.condition.icon">
        <strong>{{ Math.round(weatherData.info.temp_c) }}°C</strong>
      </div>
      <div><span @click="switchRoute(true)"
          :style="`cursor:pointer;${showNorth ? 'background-color:var(--col-main);color:white;' : 'text-decoration:underline;'}`">{{
            $t('northern-route') }}</span>
        |
        <span @click="switchRoute(false)"
          :style="`cursor:pointer;${!showNorth ? 'background-color:var(--col-main);color:white;' : 'text-decoration:underline;'}`">{{
            $t('southern-route') }}</span>
      </div>
      <div id="mapbox" style="width: 100%;height:50vh;margin-top:2em;">
      </div>
      <div v-if="localeArrival" v-html="showNorth ? localeArrival.north : localeArrival.south"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LngLatBoundsLike, CameraOptions } from 'mapbox-gl'
import type { Weather } from '~/types/weather'


import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import southernRoute from '@/assets/southernRoute.json'
import northernRoute from '@/assets/northernRoute.json'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
mergeHead(i18n.locale.value, i18n.t('arrival'), 'How to reach Limnionas Village', '')
const config = useRuntimeConfig()
const { data: arrival } = useArrival()
const showNorth = ref(false)
const loadingWeather = ref(true)
const weatherData = ref<Weather | null>(null)
let map: mapboxgl.Map | null = null
const southernGeojson = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'LineString',
    coordinates: southernRoute
  }
}
const localeArrival = computed(() => {
  if (!arrival.value) return null
  if (i18n.locale.value === 'de' || i18n.locale.value === 'fr' || i18n.locale.value === 'en') {
    const ret = Object.assign({}, arrival.value)
    ret.translations = []
    if (i18n.locale.value !== 'en') {
      const t = arrival.value.translations.find(trans => trans.languages_code === i18n.locale.value)
      if (t) {
        ret.intro = t.intro
        ret.north = t.north
        ret.south = t.south
      }
    }
    return ret
  }
  return arrival.value
})
const southernBounds: LngLatBoundsLike = [{ lon: 26.611206, lat: 37.691813 }, { lon: 26.937811, lat: 37.690881 }]
const northernBounds: LngLatBoundsLike = [{ lon: 26.611206, lat: 37.8174 }, { lon: 26.9899, lat: 37.690881 }]
const mapPadding = {
  padding: { top: 10, bottom: 10, left: 10, right: 10 }
}
const southernLayer: mapboxgl.LineLayer = {
  id: 'southernRoute',
  type: 'line',
  source: {
    type: 'geojson',
    // @ts-ignore
    data: southernGeojson
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
const northernGeojson = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'LineString',
    coordinates: northernRoute
  }
}
const northernLayer: mapboxgl.LineLayer = {
  id: 'northernRoute',
  type: 'line',
  source: {
    type: 'geojson',
    // @ts-ignore
    data: northernGeojson
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
const switchRoute = (goNorth = true) => {
  //console.log(map)
  if (!map) return
  if (goNorth && !showNorth.value) {
    map.setLayoutProperty('northernRoute', 'visibility', 'visible')
    map.setLayoutProperty('southernRoute', 'visibility', 'none')
    const newCam: CameraOptions | void = map.cameraForBounds(northernBounds, mapPadding)
    if (newCam && newCam.center && newCam.zoom) {
      map.flyTo({ center: newCam.center, zoom: newCam.zoom })
    }
  } else if (!goNorth && showNorth.value) {
    map.setLayoutProperty('northernRoute', 'visibility', 'none')
    map.setLayoutProperty('southernRoute', 'visibility', 'visible')
    const newCam: CameraOptions | void = map.cameraForBounds(southernBounds, mapPadding)
    if (newCam && newCam.center && newCam.zoom) {
      map.flyTo({ center: newCam.center, zoom: newCam.zoom })
    }
  }
  showNorth.value = goNorth
}

onMounted(() => {
  if (config.public.mapboxToken && window) {
    window.setTimeout(async () => {
      weatherData.value = await getSingletonItem<Weather>({ collection: 'weather' })
      console.log(weatherData.value)
      loadingWeather.value = false
      mapboxgl.accessToken = config.public.mapboxToken
      map = new mapboxgl.Map({
        container: 'mapbox',
        style: 'mapbox://styles/mapbox/streets-v12',
        bounds: southernBounds
      })
      map.on('load', () => {
        if (map) {
          const markerAirport = new mapboxgl.Marker({ color: '#0070b3', scale: 0.75 }).setLngLat({ lon: 26.914984778344206, lat: 37.691671384443 })
          const markerLimvil = new mapboxgl.Marker({ color: '#363c90' }).setLngLat({ lon: 26.63102221522945, lat: 37.69445784330787 })
          markerAirport.addTo(map)
          markerLimvil.addTo(map)
          map.addLayer(northernLayer)
          map.addLayer(southernLayer)
          map.setLayoutProperty('northernRoute', 'visibility', 'none')
        }
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

@media screen and (max-width:600px) {
  .arrival-content {
    margin: 128px 0 32px 0;
    padding: 1.5rem;
  }
}

.weather-data {
  display: grid;
  gap: 16px;
  grid-auto-flow: column;
  justify-content: start;
  align-items: center;
}
</style>
