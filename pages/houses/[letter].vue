<template>
  <div class="house-page" v-if="house && localeHouse">
    <LimvilWave class="house-wave" />
    <div class="house-content">
      <p style="text-align: center;">
        <img loading="lazy" v-if="house.logo" :src="`${config.public.directusBase}/assets/${house.logo}`">
      </p>
      <h2>{{ localeHouse.name }}</h2>
      <div class="house-infos">
        <div v-html="localeHouse.description" />
        <div class="house-furnishing-and-prices">
          <div>
            <h3 style="margin-top:0">{{ $t('prices_per_night') }}</h3>
            <table class="prices-table">
              <tr v-for="(s, idx) in prices.seasons" :key="s.name">
                <td>{{ $d(Date.parse(s.start), 'text_short_no_month') }}</td>
                <td>-</td>
                <td>{{ $d(Date.parse(s.end), 'text_short_no_month') }}</td>
                <td style="text-align:right;" v-if="idx === 0 || idx === 4">
                  {{ $n(house.price_off_season, 'currency') }}
                </td>
                <td style="text-align:right;" v-else-if="idx === 1 || idx === 3">
                  {{ $n(house.price_pre_season, 'currency') }}
                </td>
                <td style="text-align:right;" v-else-if="idx === 2">
                  {{ $n(house.price_main_season, 'currency') }}
                </td>
              </tr>
            </table>
          </div>
          <div style="display:grid; place-items: center;">
            <img v-if="house.ground_plan_new" loading="lazy" class="house-plan"
              :src="`${config.public.directusBase}/assets/${house.ground_plan_new}`">
            <img v-else-if="house.ground_plan" loading="lazy" class="house-plan"
              :src="`${config.public.directusBase}/assets/${house.ground_plan}`">
          </div>
          <div>
            <h3 style="margin-top:0">{{ $t('furnishing') }}</h3>
            <p style="white-space: pre;">{{ localeHouse.furnishing }}</p>
          </div>
        </div>
      </div>
    </div>
    <swiper @swiper="setThumbsSwiper" :loop="true" :spaceBetween="10" slidesPerView="auto" :freeMode="true"
      :modules="modules" class="mySwiper">
      <swiper-slide v-for="p in house.fotos" :key="p.directus_files_id">
        <img
          :src="`${config.public.directusBase}/assets/${p.directus_files_id}?fit=inside&width=1024&height=1024&format=${config.public.imageFormat}`"
          alt="Picture" loading="lazy">
      </swiper-slide>
    </swiper>
    <!-- <div class="house-fotos" :style="`width: ${width}px; height: ${height}px`" v-if="width !== Infinity">
      <Transition name="pic-fade" :duration="500">
        <img :key="`i - ${curImage}`" :src="curImagePath" lazy class="house-foto" />
      </Transition>
    </div> -->
  </div>
  <div v-else>
    {{ $t('house_not_found') }}
  </div>
</template>

<script setup lang="ts">
import type { Swiper } from 'swiper'
import { useI18n } from 'vue-i18n'
import { FreeMode, Navigation, Thumbs } from 'swiper'
const route = useRoute()
const letter: string = route.params.letter.toString().toLowerCase()
await initHouses()
await initPrices()
const config = useRuntimeConfig()
const houses = useHouses()
const prices = usePrices()
const i18n = useI18n()
const { width, height } = useWindowSize()
let thumbsSwiper = null;

const setThumbsSwiper = (swiper: Swiper) => {
  thumbsSwiper = swiper
}
const modules = [FreeMode]
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
  img1.src = `${config.public.directusBase}/assets/${house.fotos[nextIdx].directus_files_id}?fit=inside&width=${width.value}&height=${height.value}&format=${config.public.imageFormat}`
}
const curImagePath = computed(() => {
  if (width.value !== Infinity && house && curImage.value !== -1) {
    return `${config.public.directusBase}/assets/${house.fotos[curImage.value].directus_files_id}?fit=inside&width=${width.value}&height=${height.value}&format=${config.public.imageFormat}`
  } else {
    return ''
  }

})
mergeHead(
  i18n.locale.value,
  localeHouse?.value?.name || house?.name || '',
  localeHouse?.value?.short.replace(/<[^>]+>/g, '') || '',
  `${config.public.directusBase}/assets/${house?.big_picture}?fit=contain&width=400&height=400&format=${config.public.imageFormat}`
)

const bgStyle = useBackgroundImageState()
if (width.value !== Infinity && house) {
  bgStyle.value = `background-image: url(${config.public.directusBase}/assets/${house.big_picture}?fit=cover&width=${width.value}&height=${height.value}&format=${config.public.imageFormat});`
}
onMounted(() => {
  if (house && !bgStyle.value) {
    bgStyle.value = `background-image: url(${config.public.directusBase}/assets/${house.big_picture}?fit=cover&width=${width.value}&height=${height.value}&format=${config.public.imageFormat});`
  }
  // window.setTimeout(() => {
  //   window.scrollTo(0, 0)
  //   nextImage()
  // }, 500)
  // window.setInterval(() => {
  //   nextImage()
  // }, 6000)
})
</script>


<style>
.house-fotos {
  display: grid;
  grid-template-areas: 'foto';
  justify-content: center;
}

.house-foto {
  grid-area: foto;

}

.house-page {
  min-height: 100vh;
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

.house-plan {
  width: 100%;
}

.house-infos {
  padding: 0 10vw;
  box-sizing: border-box;
  /* max-width: 600px; */
}

@media screen and (max-width: 400px) {
  .house-content {
    margin: 0;
    padding: 16px;
  }
}

.house-furnishing-and-prices {
  display: grid;
  grid-template-columns: auto 400px auto;
  place-content: center;
  margin: 32px 0;
  gap: 64px;
}

@media screen and (max-width: 600px) {
  .house-infos {
    padding: 0 2vw;
    /* max-width: 600px; */
  }

  .house-furnishing-and-prices {
    grid-template-columns: 1fr;
    place-items: center;
  }

  .house-furnishing-and-prices p,
  .house-furnishing-and-prices h3 {
    text-align: center;
  }

  .house-plan {
    height: unset;
    width: 80vw;
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
