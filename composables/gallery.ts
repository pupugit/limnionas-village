import type { Gallery } from "~/types/gallery"

export function useGallery() {
  const { getItemById } = useDirectusItems()
  const config = useRuntimeConfig()
  return useAsyncData('gallery', () => getItemById<Gallery>({ collection: 'galleries', 'id': config.public.galleryId, params: { fields: ['*', 'fotos.directus_files_id'] } }))
}
