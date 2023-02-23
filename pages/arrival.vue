<template>
  <div class="arrival-page">
    <div class="arrival-content" style="width:100%">
      <div v-html="arrival.intro"></div>
      <div><span @click="switchRoute(true)"
          :style="`cursor:pointer;${showNorth ? 'background-color:var(--col-main);color:white;' : 'text-decoration:underline;'}`">{{
            $t('northern-route') }}</span>
        |
        <span @click="switchRoute(false)"
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
import type { LngLatBoundsLike, CameraOptions } from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import southernRoute from '@/assets/southernRoute.json'
import northernRoute from '@/assets/northernRoute.json'
const config = useRuntimeConfig()
await initArrival()
const arrival = useArrival()
const showNorth = ref(false)
let map: mapboxgl.Map | null = null
const southernGeojson = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'LineString',
    coordinates: southernRoute
  }
}
/*
 airport
 { lon: 26.914984778344206, lat: 37.691671384443 }
 26.914984778344206,37.691671384443

 26.967811,37.690881

 limnionas village
 { lon: 26.63102221522945, lat: 37.69445784330787 }
 26.63095129176827,37.69426001068132

 26.621206,37.691813

 var locFlughafen = {name: 'Samos Airport', lat: 37.6902823, lng: 26.9035715};
var locLimvil = {name: 'Limnionas Village', lat: 37.694334, lng: 26.631163};
var locVathy = {lat: 37.7495953, lng: 26.976421};
26.976421,37.7495953
var locKokkari = {lat: 37.7773689, lng: 26.869398};
26.869398,37.7773689
top end: 37.8174,26.7527
*/
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
      map.setCenter(newCam.center)
      map.setZoom(newCam.zoom)
    }
  } else if (!goNorth && showNorth.value) {
    map.setLayoutProperty('northernRoute', 'visibility', 'none')
    map.setLayoutProperty('southernRoute', 'visibility', 'visible')
    const newCam: CameraOptions | void = map.cameraForBounds(southernBounds, mapPadding)
    if (newCam && newCam.center && newCam.zoom) {
      map.setCenter(newCam.center)
      map.setZoom(newCam.zoom)
    }
  }
  showNorth.value = goNorth
}

onMounted(() => {
  if (config.public.mapboxToken && window) {
    window.setTimeout(() => {
      mapboxgl.accessToken = config.public.mapboxToken
      map = new mapboxgl.Map({
        container: 'mapbox',
        style: 'mapbox://styles/mapbox/streets-v12',
        bounds: southernBounds
      })
      map.on('load', () => {
        if (map) {
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
</style>
