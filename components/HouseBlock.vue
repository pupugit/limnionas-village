<script setup lang="ts">
import type { House } from "~~/types/houses"

const config = useRuntimeConfig()
const props = defineProps<{
  house: House,
}>()
const width = ref(0)
const height = ref(1024)

const houseBlock = ref(null)
const isBlockVisible = ref(false)
const zenMode = useZenMode()

useIntersectionObserver(
  houseBlock,
  ([{ isIntersecting }]) => {
    isBlockVisible.value = isIntersecting
  },
)
onMounted(() => {
  if (window) {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }
})
const calcBGSrc = computed(() => {
  if (!props.house.big_picture || width.value == 0) return ''
  return `${config.public.directusBase}/assets/${props.house.big_picture}?fit=cover&width=${width.value}&height=${height.value}&format=webp`
})

const calcBG = computed(() => {
  if (!props.house.big_picture || width.value == 0) return ''
  return `background-image: url(${config.public.directusBase}/assets/${props.house.big_picture}?fit=cover&width=${width.value}&height=${height.value}&format=webp);`
})

</script>

<template>
  <div class="house-box">
    <div :class="`house-bg${zenMode ? ' zen-mode' : ''}`">
      <img :src="calcBGSrc" loading="lazy" class="house-img" @click.self="zenMode = !zenMode">
      <div ref="houseBlock" :class="`house-info${isBlockVisible ? ' clicked' : ''}`"
        @click="$router.push(`/house/${house.letter.toLowerCase()}`)">
        <h2>{{ house.name }}</h2>
        <img lazy v-if="house.logo" :src="`${config.public.directusBase}/assets/${house.logo}`">
        <p class="house-details">{{ house.people }} {{ $t('people') }}</p>
        <div class="house-details" v-html="house.short" />
        <p class="house-details">
          <NuxtLink :to="`/house/${house.letter.toLowerCase()}`">{{ $t('more_informations') }}</NuxtLink>
        </p>
      </div>
    </div>
    <!-- <svg version="1.1" viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
      <path d="m0 100v-99c195-1.6 390-3.2 550 2.8 160 5.9 286 19 429 20 143 0.79 302-11 461-23v99z" fill="#fff"
        stroke-width="0" />
    </svg> -->
  </div>
</template>

<style>
.house-bg {
  width: 100vw;
  width: 100dvw;
  height: 100vh;
  height: 100dvh;
  display: grid;
  place-items: center;
  background-position: center;
  background-size: cover;
  /* padding-top: 72px; */
  box-sizing: border-box;
  grid-template-areas: 'main';
}

.house-bg>div,
.house-bg>img {
  grid-area: main;
}

.house-img {
  width: 100vw;
  width: 100dvw;
  height: 100vh;
  height: 100dvh;
}

.house-bg.zen-mode>.house-info {
  opacity: 0;
  visibility: hidden;
}

.house-info {
  display: grid;
  place-items: center;
  background-color: rgba(255, 255, 255, var(--trans));
  border-radius: 50%;
  padding: 16px;
  transition: all .5s ease-out;
  cursor: pointer;
  border-radius: 32px;
  color: var(--col-main);
  width: 200px;
  height: 200px;
  box-sizing: border-box;
}

.house-info:hover {
  background-color: white;
}


.house-info.clicked {
  padding: 32px;
  width: min(600px, 85vw);
  height: unset;
}

.house-details {
  opacity: 0;
  height: 0;

}

.house-info.clicked .house-details {
  opacity: 100;
  transition-property: all;
  transition-duration: .5s;
  transition-delay: .5s;
  transition-timing-function: ease-in;
  height: unset;
}
</style>
