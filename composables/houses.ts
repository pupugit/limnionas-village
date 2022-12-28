import type { House } from "~~/types/houses"

export const useHouses = () => useState<House[]>('houses', () => {
  return []
})

export const useHousesBasic = () => useState<House[]>('housesBasic', () => {
  return []
})

export const initHouses = async () => {
  const { getItems } = useDirectusItems()
  const houses = useHouses()
  if (houses.value.length === 0) {
    const hItems = await getItems<House[]>({ collection: 'houses', params: { sort: 'letter', fields: ['id', 'letter', 'name', 'people', 'short', 'color', 'logo', 'logo_raster', 'big_picture', 'price_main_season', 'price_pre_season', 'price_off_season', 'description', 'furnishing', 'ground_plan_new', 'fotos.directus_files_id', 'translations.*'] } })
    houses.value = hItems
  }
}

export const initHousesBasic = async () => {
  const { getItems } = useDirectusItems()
  const houses = useHousesBasic()
  if (houses.value.length === 0) {
    const hItems: House[] = await getItems({ collection: 'houses', params: { sort: 'letter', fields: ['id', 'letter', 'logo', 'name', 'people', 'short', 'big_picture', 'translations.languages_id', 'translations.name', 'translations.short'] } })
    houses.value = hItems
  }
}
