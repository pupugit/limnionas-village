export type Article = {
  id: string
  title: string
  content: string
  category: string
  translations: ArticleTranslation[]
  fotos: ArticleFile[]
  sort: number | null
}

export type ArticleTranslation = {
  id: string
  languages_code: string
  title: string
  content: string
}

export type ArticleFile = {
  directus_files_id: string
}
