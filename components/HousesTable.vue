<template>
  <div class="houses-table-root" v-if="localeHouses && prices">
    <table class="houses-table-small" v-if="small" key="tsmall">
      <template v-for="house in localeHouses" :key="house.id">
        <tr>
          <td colspan="2" style="font-weight: bold;padding-top: 16px;">
            <nuxt-link :to="`/houses/${house.letter.toLowerCase()}`">{{ house.name }} - {{ house.people }} {{
              $t('persons') }}</nuxt-link>
          </td>
        </tr>
        <tr v-for="(s, idx) in prices.seasons" :key="s.name">
          <td>
            {{ $d(Date.parse(s.start), 'text_short_no_month') }}
            -
            {{ $d(Date.parse(s.end), 'text_short_no_month') }}
          </td>
          <td>
            <template v-if="idx === 0 || idx === 4">{{ $n(house.price_off_season, 'currency') }}</template>
            <template v-else-if="idx === 1 || idx === 3">{{ $n(house.price_pre_season, 'currency') }}</template>
            <template v-else>{{ $n(house.price_main_season, 'currency') }}</template>
          </td>
        </tr>
      </template>
    </table>
    <table class="houses-table" v-else key="tnotsmall">
      <thead>
        <tr>
          <th>{{ $t('house') }}</th>
          <th v-for="(s, idx) in prices.seasons" :key="s.name">
            {{ $d(Date.parse(s.start), 'text_short_no_month') }}
            -
            {{ $d(Date.parse(s.end), 'text_short_no_month') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="house in localeHouses" :key="house.id">
          <td style="text-align: left;">
            <nuxt-link :to="`/houses/${house.letter.toLowerCase()}`">{{ house.name }}</nuxt-link><br />
            {{ house.people }} {{ $t('persons') }}
          </td>
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
const width = ref(0)
onMounted(() => {
  width.value = window.outerWidth
})
const small = computed(() => {
  if (width.value !== Infinity && width.value >= 800) return false
  return true
})


const config = useRuntimeConfig()
const { data: houses } = await useHouses()
const { data: prices } = await usePrices()
const i18n = useI18n()

const localeHouses = computed(() => {
  if (!houses.value) return []
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

<style lang="scss" scoped>
table.houses-table-small {
  td {
    text-align: left;
    padding: 4px 16px 4px 0;
  }

  td:nth-child(2) {
    text-align: right;
  }
}

table.houses-table {
  margin-top: 1em;

  th,
  td {
    padding: 8px;
    border: 1px solid var(--col-main);
  }

  td {
    text-align: right;
  }
}
</style>
