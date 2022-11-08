import type { GuestbookEntry } from "~~/types/guestbookEntry"

export const useGuestbook = () => useState<GuestbookEntry[]>('guestbook', () => {
  return []
})

export const initGuestbook = async () => {
  const { getItems } = useDirectusItems()
  const guestbook = useGuestbook()
  if (guestbook.value.length === 0) {
    const hItems = await getItems<GuestbookEntry[]>({ collection: 'guestbook', params: { sort: 'date_created' } })
    guestbook.value = hItems
  }
}
