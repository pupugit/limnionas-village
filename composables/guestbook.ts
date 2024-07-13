import type { GuestbookEntry } from "~/types/guestbookEntry"

export function useGuestbook() {
  const { getItems } = useDirectusItems()
  return useAsyncData('guestbook', () => getItems<GuestbookEntry>({ collection: 'guestbook', params: { sort: '-date_created' } }))
}
