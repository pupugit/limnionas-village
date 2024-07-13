import type { Article } from "~/types/articles"

export function useHikes() {
  const { getItems } = useDirectusItems()
  return useAsyncData('hikes', () => getItems<Article>({
    collection: 'articles', params: {
      sort: 'sort',
      filter: { category: 'hikes' },
      fields: ['*', 'fotos.directus_files_id', 'translations.*']
    }
  })
  )
}
