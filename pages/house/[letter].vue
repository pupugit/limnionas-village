<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const route = useRoute()
const letter: string = route.params.letter.toString().toLowerCase()
await initHouses()
await initPrices()
const config = useRuntimeConfig()
const houses = useHouses()
const prices = usePrices()
const i18n = useI18n()
const now = new Date()
const nowFormat = now.toISOString().slice(5, 10)
const activeSeason = computed(() => {
  return prices.value.seasons.find((s) => {
    return s.start.slice(5, 10).localeCompare(nowFormat) <= 0 && s.end.slice(5, 10).localeCompare(nowFormat) >= 0
  })
})
const house = houses.value.find(h => h.letter.toLowerCase() === letter) || null
const localeHouse = computed(() => {
  if (!house) return null
  if (i18n.locale.value === 'de' || i18n.locale.value === 'fr' || i18n.locale.value === 'en') {
    const ret = Object.assign({}, house)
    ret.translations = []
    if (i18n.locale.value !== 'en') {
      const t = house.translations.find(trans => trans.languages_id === i18n.locale.value)
      if (t) {
        ret.name = t.name
        ret.description = t.description
        ret.furnishing = t.furnishing
        ret.short = t.short
      }
    }
    return ret
  }
})

const curImage = ref<number>(-1)
const nextImage = () => {
  if (!house) return
  curImage.value += 1
  if (curImage.value >= house.fotos.length)
    curImage.value = 0
  const img1 = new Image()
  let nextIdx = curImage.value + 1
  if (nextIdx >= house.fotos.length) nextIdx = 0
  img1.src = `${config.public.directusBase}/assets/${house.fotos[nextIdx].directus_files_id}?fit=cover&width=${window.innerWidth}&height=${window.innerWidth}&format=webp`
}
const curImagePath = computed(() => {
  if (typeof window !== 'undefined' && house && curImage.value !== -1) {
    return `${config.public.directusBase}/assets/${house.fotos[curImage.value].directus_files_id}?fit=cover&width=${window.innerWidth}&height=${window.innerWidth}&format=webp`
  } else {
    return ''
  }

})

useHead({
  title: localeHouse?.value?.name || house?.name || 'Limnionas Village',
  link: [{
    rel: 'icon',
    href: 'https://limnionas.netlify.app/favicon.ico',
    type: 'image/x-icon'
  }],
  meta: [{
    name: 'description',
    content: house?.short || ''

  }, {
    hid: 'og:site_name',
    name: 'og:site_name',
    property: 'og:site_name',
    content: 'Limnionas Village',
  }, {
    hid: 'og:title',
    name: 'og:title',
    property: 'og:title',
    content: house?.name || 'Limnionas Village'
  }, {
    hid: 'og:image',
    name: 'og:image',
    property: 'og:image',
    content: house?.logo_raster ? `${config.public.directusBase}/assets/${house.logo_raster}` : 'https://limnionas.netlify.app/limvil-picture.png'
  }, {
    hid: 'og:image:height',
    name: 'og:image:height',
    property: 'og:image:height',
    content: '350',
  }, {
    hid: 'og:image:width',
    name: 'og:image:width',
    property: 'og:image:width',
    content: '350',
  }, {
    hid: 'og:description',
    name: 'og:description',
    property: 'og:description',
    content: house?.short.replace(/<[^>]+>/g, '') || ''
  }]
})

const bgStyle = useBackgroundImageState()
if (typeof window !== 'undefined' && house) {
  bgStyle.value = `background-image: url(${config.public.directusBase}/assets/${house.big_picture}?fit=cover&width=${window.innerWidth}&height=${window.innerHeight}&format=webp);`
}
onMounted(() => {
  if (house && !bgStyle.value) {
    bgStyle.value = `background-image: url(${config.public.directusBase}/assets/${house.big_picture}?fit=cover&width=${window.innerWidth}&height=${window.innerHeight}&format=webp);`
  }
  window.setTimeout(() => {
    nextImage()
  }, 500)
  window.setInterval(() => {
    nextImage()
  }, 4000)
})
</script>

<template>
  <div class="house-page" v-if="house && localeHouse">
    <LimvilWave class="house-wave" />
    <div class="house-content">
      <p style="text-align: center;text-align-last:center;">
        <img loading="lazy" v-if="house.logo" :src="`${config.public.directusBase}/assets/${house.logo}`">
      </p>
      <h2>{{ localeHouse.name }}</h2>
      <div class="house-infos">
        <div v-html="localeHouse.description" />
        <div class="house-furnishing-and-prices">
          <div>
            <h3>{{ $t('furnishing') }}</h3>
            <p style="white-space: pre;">{{ localeHouse.furnishing }}</p>
          </div>
          <div>
            <h3>{{ $t('prices_per_night') }}</h3>
            <table class="prices-table">
              <tr v-for="(s, idx) in prices.seasons" :key="s.name" :class="s === activeSeason ? 'active-season' : ''">
                <td>{{ $d(Date.parse(s.start), 'text_short_no_month') }}</td>
                <td>{{ $t('to') }}</td>
                <td>{{ $d(Date.parse(s.end), 'text_short_no_month') }}</td>
                <td v-if="idx === 0 || idx === 4">{{ $n(house.price_off_season, 'currency') }}</td>
                <td v-else-if="idx === 1 || idx === 3">{{ $n(house.price_pre_season, 'currency') }}</td>
                <td v-else-if="idx === 2">{{ $n(house.price_main_season, 'currency') }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="house-fotos">
      <Transition name="pic-fade" :duration="500" mode="in-out">
        <LimvilWave :key="`t-${curImage}`" class="house-foto pic-wave-top" fill="white" />
      </Transition>
      <Transition name="pic-fade" :duration="500">
        <img :key="`i-${curImage}`" :src="curImagePath" lazy class="house-foto" />
      </Transition>
      <Transition name="pic-fade" :duration="500" mode="in-out">
        <LimvilWave :key="`b-${curImage}`" class="house-foto pic-wave-bottom" fill="white" />
      </Transition>
    </div>
  </div>
  <div v-else>
    {{ $t('house_not_found') }}
  </div>
</template>
<style>
.house-fotos {
  display: grid;
  grid-template-areas: 'foto';
  justify-content: center;
}

.house-foto {
  grid-area: foto;
  max-width: 600px;
  max-height: 600px;
  width: 100vw;
  height: 100vw;
}

.house-page {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  justify-content: stretch;
  align-content: start;
}

.pic-wave-top {
  z-index: 50;
  height: 25px;
  width: 100vw;
  transform: rotate(180deg);
}

.pic-wave-bottom {
  z-index: 50;
  height: 25px;
  width: 100vw;
  align-self: end;
}


.house-wave {
  margin-top: calc(100vh - 280px);
  height: 50px;
  width: 100vw;
}

.house-content {
  padding: 32px;
  background: linear-gradient(rgba(255, 255, 255, var(--trans)), white 200px);
  border-radius: 0;
  display: grid;
  justify-content: center;
}

.house-infos {
  max-width: 600px;
}

@media screen and (max-width: 400px) {
  .house-content {
    margin: 0;
    padding: 16px;
  }
}

.house-furnishing-and-prices {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

@media screen and (max-width: 600px) {
  .house-furnishing-and-prices {
    grid-template-columns: 1fr;
  }
}

.prices-table {
  border-collapse: collapse;
}

.prices-table .active-season {
  font-weight: bold;
}

.prices-table td {
  padding: 2px;
}
</style>
