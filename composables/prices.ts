import type { Prices } from "~/types/prices"
export function usePrices() {
  const { getSingletonItem } = useDirectusItems()
  return useAsyncData('houses', () => getSingletonItem<Prices>({ collection: 'prices' })
  )
}
