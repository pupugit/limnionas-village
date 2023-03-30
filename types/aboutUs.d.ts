
export type AboutUs = {
  id: string | null
  content: string
  background: string
  fotos: AboutUsFile[]
  translations: AboutUsTranslation[]

}

export type AboutUsFile = {
  directus_files_id: string
}
export type AboutUsTranslation = {
  id: string
  about_us_id: string
  languages_id: string
  languages_code: string
  content: string
}
