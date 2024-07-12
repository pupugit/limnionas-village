import type { BlogEntry } from "~/types/blogEntry"

export const useBlog = () => useState<BlogEntry[]>('blog', () => {
  return []
})

export const initBlog = async () => {
  const { getItems } = useDirectusItems()
  const blog = useBlog()
  if (blog.value.length === 0) {
    blog.value = await getItems<BlogEntry>({ collection: 'blog', params: { sort: '-date_publish' } })
  }
}
