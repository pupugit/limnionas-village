import type { Specials } from "~/types/specials"

export function useSpecials() {
  const { getSingletonItem } = useDirectusItems()
  return useAsyncData('specials', () => getSingletonItem<Specials>({ collection: 'specials' })
  )
}
