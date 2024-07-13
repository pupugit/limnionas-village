import type { House } from "~/types/houses"

export function useHouses() {
  const { getItems } = useDirectusItems()
  return useAsyncData('houses', () => getItems<House>({ collection: 'houses', params: { sort: 'letter', fields: ['id', 'letter', 'name', 'people', 'short', 'color', 'logo', 'logo_raster', 'big_picture', 'price_main_season', 'price_pre_season', 'price_off_season', 'description', 'furnishing', 'ground_plan_new', 'fotos.directus_files_id', 'translations.*'] } })
  )
}

export function useHousesBasic() {
  const { getItems } = useDirectusItems()
  return useAsyncData('housesbasic', () => getItems<House>({ collection: 'houses', params: { sort: 'letter', fields: ['id', 'letter', 'logo', 'name', 'people', 'short', 'big_picture', 'translations.languages_id', 'translations.name', 'translations.short'] } })
  )
}
