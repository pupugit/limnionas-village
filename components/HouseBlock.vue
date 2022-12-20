<template>
  <div class="house-box" ref="houseBox">
    <div :class="`house-bg${zenMode ? ' zen-mode' : ''}`">
      <img :src="calcBGSrc" loading="lazy" class="house-img" @click.self="zenMode = !zenMode"
        :alt="`Background ${house.name}`">
      <div ref="houseBlock" :class="`house-info${isBlockVisible ? ' clicked' : ''}`"
        @click="$router.push(`/house/${house.letter.toLowerCase()}`)">
        <h2>{{ house.name }}</h2>
        <img loading="lazy" v-if="house.logo" :src="`${config.public.directusBase}/assets/${house.logo}`"
          :alt="`Logo {{ house.name }}`">
        <p class="house-details">{{ house.people }} {{ $t('people') }}</p>
        <div class="house-details" v-html="house.short" />
        <p class="house-details">
          <NuxtLink :to="`/house/${house.letter.toLowerCase()}`">{{ $t('more_informations') }}</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { House } from "~~/types/houses"

const config = useRuntimeConfig()
const props = defineProps<{
  house: House,
}>()
const { width, height } = useWindowSize()
const houseBox = ref<HTMLElement | null>(null)
const houseBlock = ref(null)
const isBlockVisible = ref(false)
const zenMode = useZenMode()

useIntersectionObserver(
  houseBlock,
  ([{ isIntersecting }]) => {
    isBlockVisible.value = isIntersecting
  },
)
const calcBGSrc = computed(() => {
  if (!props.house.big_picture || width.value === Infinity || !houseBox.value) return ''
  return `${config.public.directusBase}/assets/${props.house.big_picture}?fit=cover&width=${width.value}&height=${height.value}&format=png`
})

const calcBG = computed(() => {
  if (!props.house.big_picture || width.value === Infinity) return ''
  return `background-image: url(${config.public.directusBase}/assets/${props.house.big_picture}?fit=cover&width=${width.value}&height=${height.value}&format=png);`
})

</script>

<style>
.house-bg {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  background-position: center;
  background-size: cover;
  padding-top: 72px;
  box-sizing: border-box;
  grid-template-areas: 'main';
}

.house-bg>div,
.house-bg>img {
  grid-area: main;
}

.house-img {
  width: 100vw;
  height: 100vh;
  margin-top: -72px;
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
