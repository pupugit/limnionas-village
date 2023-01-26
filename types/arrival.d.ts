// import { DirectusFile } from "nuxt-directus/dist/runtime/types"

export type Arrival = {
  id: number | null
  intro: string
  north: string
  south: string
  translations: ArrivalTranslation[]

}

export type ArrivalTranslation = {
  id: string
  arrival_id: number
  languages_code: string
  intro: string
  north: string
  south: string
}
