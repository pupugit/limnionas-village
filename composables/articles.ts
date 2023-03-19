import type { Article } from "~/types/articles"

export const useArticles = () => useState<Article[]>('articles', () => {
  return []
})

export const initArticles = async () => {
  const { getItems } = useDirectusItems()
  const articles = useArticles()
  if (articles.value.length === 0) {
    const hItems = await getItems<Article[]>({ collection: 'articles', params: { sort: 'sort', fields: ['*', 'fotos.directus_files_id', 'translations.*'] } })
    articles.value = hItems
  }
}
