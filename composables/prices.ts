import type { Prices } from "~/types/prices"

export const usePrices = () => useState<Prices>('prices', () => {
  return { id: 0, seasons: [], visitors_tax: [] }
})

export const initPrices = async () => {
  const { getSingletonItem } = useDirectusItems()
  const prices = usePrices()
  if (prices.value.id === 0) {
    prices.value = await getSingletonItem<Prices>({ collection: 'prices' })
  }
}
