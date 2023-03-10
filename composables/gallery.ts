import type { Gallery } from "~~/types/gallery"

export const useGallery = () => useState<Gallery>('gallery', () => {
  return {
    id: '',
    name: '',
    sort: 0,
    fotos: [],
  }
})

export const initGallery = async () => {
  const { getItems, getItemById } = useDirectusItems()
  const gallery = useGallery()
  if (gallery.value.id === '') {
    const hItems: Gallery = await getItemById<Gallery>({ collection: 'galleries', 'id': '1dd10224-8a2b-4999-8531-1a384138f2fc', params: { fields: ['*', 'fotos.directus_files_id'] } })
    gallery.value = hItems
  }
}
