import type { Specials } from "~~/types/specials"

export const useSpecials = () => useState<Specials>('specials', () => {
  return {
    id: 0, welcome_pic: '',
    welcome_back: '',
    welcome_back2: '',
    welcome_back3: '',
    welcome_back4: '',
    guestbook: '',
    contact: '',
    tos: '',
  }
})

export const initSpecials = async () => {
  const { getSingletonItem, getItems } = useDirectusItems()
  const specials = useSpecials()
  if (specials.value.id === 0) {
    const hItems: Specials = await getSingletonItem<Specials>({ collection: 'specials' })
    specials.value = hItems
  }
}
