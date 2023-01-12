import type { AboutUs } from "~~/types/aboutUs"

export const useAboutUs = () => useState<AboutUs>('about_us', () => {
  return {
    id: null,
    content: '',
    fotos: [],
    translations: [],
  }
})

export const initSpecials = async () => {
  const { getSingletonItem } = useDirectusItems()
  const aboutUs = useAboutUs()
  if (aboutUs.value.id === null) {
    const hItems: AboutUs = await getSingletonItem<AboutUs>({ collection: 'about_us' })
    aboutUs.value = hItems
  }
}
