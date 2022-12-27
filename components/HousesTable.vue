<template>
  <div>
    <table class="houses-table">
      <thead>
        <th>{{ $t('house') }}</th>
        <th v-for="(s, idx) in prices.seasons" :key="s.name">
          {{ $d(Date.parse(s.start), 'text_short_no_month') }}
          {{ $t('to') }}
          {{ $d(Date.parse(s.end), 'text_short_no_month') }}
        </th>
      </thead>
      <tbody>
        <tr v-for="house in localeHouses" :key="house.id">
          <td><nuxt-link :to="`/houses/${house.letter.toLowerCase()}`">{{ house.name }}</nuxt-link></td>
          <td>{{ $n(house.price_off_season, 'currency') }}</td>
          <td>{{ $n(house.price_pre_season, 'currency') }}</td>
          <td>{{ $n(house.price_main_season, 'currency') }}</td>
          <td>{{ $n(house.price_pre_season, 'currency') }}</td>
          <td>{{ $n(house.price_off_season, 'currency') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

await initPrices()
await initHouses()
const config = useRuntimeConfig()
const houses = useHouses()
const prices = usePrices()

const i18n = useI18n()
const localeHouses = computed(() => {
  if (i18n.locale.value === 'de' || i18n.locale.value === 'fr' || i18n.locale.value === 'en') {
    return houses.value.map((h) => {
      const ret = Object.assign({}, h)
      ret.translations = []
      if (i18n.locale.value !== 'en') {
        const t = h.translations.find(trans => trans.languages_id === i18n.locale.value)
        if (t) {
          ret.name = t.name
        }
      }
      return ret
    })
  }
  return []
})
</script>

<style lang="scss">
table.houses-table {
  border-collapse: collapse;

  th,
  td {
    border: 1px solid var(--col-main);
  }
}
</style>
