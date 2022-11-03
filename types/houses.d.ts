import { DirectusFile } from "nuxt-directus/dist/runtime/types"

export type House = {

  /** File ID from house */
  id: string
  name: string
  letter: string
  description: string
  furnishing: string
  short: string

  /** Asset ID for the logo */
  logo: string
  logo_raster: string
  price_night: number
  color: string
  color2: string
  color3: string
  people: string

  /** calculated current price per night for the main season */
  price_main_season: number

  /** calculated current price per night for the pre season */
  price_pre_season: number

  /** calculated current price per night for the off season */
  price_off_season: number
  translations: HouseTranslation[]

  /** uid of the assigned big picture */
  big_picture: string | null
  fotos: LimvilFile[]
}
export type LimvilFile = {
  directus_files_id: string
}
export type HouseTranslation = {
  id: string
  houses_id: string
  languages_id: string
  name: string
  description: string
  short: string
  furnishing: string
}
