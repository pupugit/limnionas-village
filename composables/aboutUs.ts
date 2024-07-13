import type { AboutUs } from "~/types/aboutUs"

export function useAboutUs() {
  const { getSingletonItem } = useDirectusItems()
  return useAsyncData('about_us', () => getSingletonItem<AboutUs>({ collection: 'about_us', params: { fields: ['*', 'fotos.directus_files_id', 'translations.*'] } })
  )
}
