export type Article = {
  id: string
  title: string
  content: string
  sections: ArticleSection[]
}

export type ArticleSection = {
  id: string
  name: string
  content: string
  image_back: string
  translations: TextsTranslation[]
}

export type ArticleSectionTranslation = {
  id: string
  languages_code: string
  content: string
}
