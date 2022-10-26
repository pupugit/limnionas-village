<script setup lang="ts">
import { DatetimeFormat, useI18n } from 'vue-i18n'

const config = useRuntimeConfig()
const houses = useHouses()
const prices = usePrices()
const route = useRoute()
const i18n = useI18n()
const now = new Date()
const nowFormat = now.toISOString().slice(5, 10)
const activeSeason = computed(() => {
  return prices.value.seasons.find((s) => {
    return s.start.slice(5, 10).localeCompare(nowFormat) <= 0 && s.end.slice(5, 10).localeCompare(nowFormat) >= 0
  })
})
const house = houses.value.find(h => h.letter === route.params.letter)
const localeHouse = computed(() => {
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


useHead({ title: localeHouse ? localeHouse.value.name : 'Limnionas Village' })
const bgStyle = useBackgroundImageState()
if (typeof window !== 'undefined' && house) {
  bgStyle.value = `background-image: url(${config.public.directusBase}/assets/${house.big_picture}?fit=cover&width=${window.innerWidth}&height=${window.innerHeight});`
}
onMounted(() => {
  if (window && house && !bgStyle.value) {
    bgStyle.value = `background-image: url(${config.public.directusBase}/assets/${house.big_picture}?fit=cover&width=${window.innerWidth}&height=${window.innerHeight});`
  }
})
</script>

<template>
  <div class="house-page" v-if="house">
    <div class="house-content">
      <p style="text-align: center;text-align-last:center;">
        <img v-if="house.logo" :src="`${config.public.directusBase}/assets/${house.logo}`">
      </p>
      <h2>{{ localeHouse.name }}</h2>
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
  <div v-else>
    {{ $t('house_not_found') }}
  </div>
</template>
<style>
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
