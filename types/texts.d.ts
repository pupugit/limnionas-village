export type Texts = {
  id: string
  /** Welcome text for the starting screen */
  content: string
  /** The text for the imprint screen */
  translations: TextsTranslation[]
}

export type TextsTranslation = {
  id: string
  languages_code: string
  content: string
}
