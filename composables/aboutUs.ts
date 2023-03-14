import type { AboutUs } from "~/types/aboutUs"

export const useAboutUs = () => useState<AboutUs>('about_us', () => {
  return {
    id: null,
    content: '',
    background: '',
    fotos: [],
    translations: [],
  }
})

export const initAboutUs = async () => {
  const { getSingletonItem } = useDirectusItems()
  const aboutUs = useAboutUs()
  if (aboutUs.value.id === null) {
    const hItems: AboutUs = await getSingletonItem<AboutUs>({ collection: 'about_us', params: { fields: ['*', 'fotos.directus_files_id', 'translations.*'] } })
    aboutUs.value = hItems
  }
}
