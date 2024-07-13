import type { BlogEntry } from "~/types/blogEntry"

export function useBlog() {
  const { getItems } = useDirectusItems()
  return useAsyncData('blog', () => getItems<BlogEntry>({ collection: 'blog', params: { sort: '-date_publish' } }))
}
