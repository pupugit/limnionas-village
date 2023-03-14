import type { Arrival } from "~/types/arrival"

export const useArrival = () => useState<Arrival>('arrival', () => {
  return {
    id: null,
    intro: '',
    north: '',
    south: '',
    translations: [],
  }
})

export const initArrival = async () => {
  const { getSingletonItem } = useDirectusItems()
  const arrival = useArrival()
  if (arrival.value.id === null) {
    const hItems: Arrival = await getSingletonItem<Arrival>({ collection: 'arrival', params: { fields: ['*', 'translations.*'] } })
    arrival.value = hItems
  }
}
