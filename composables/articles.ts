import type { Article } from "~/types/articles"

export const useHikes = () => useState<Article[]>('hikes', () => {
  return []
})

export const initHikes = async () => {
  const { getItems } = useDirectusItems()
  const hikes = useHikes()
  if (hikes.value.length === 0) {
    const hItems = await getItems<Article[]>({
      collection: 'articles',
      params: {
        sort: 'sort',
        filter: { category: 'hikes' },
        fields: ['*', 'fotos.directus_files_id', 'translations.*']
      }
    })
    hikes.value = hItems
  }
}
