import type { Prices } from "~/types/prices"

export function usePrices() {
  const { getSingletonItem } = useDirectusItems()
  return useAsyncData('prices', () => getSingletonItem<Prices>({ collection: 'prices' })
  )
}
