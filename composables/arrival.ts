import type { Arrival } from "~/types/arrival"

export function useArrival() {
  const { getSingletonItem } = useDirectusItems()
  return useAsyncData('arrival', () => getSingletonItem<Arrival>({ collection: 'arrival', params: { fields: ['*', 'translations.*'] } })
  )
}
