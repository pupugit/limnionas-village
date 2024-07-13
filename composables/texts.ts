import type { Texts } from "~/types/texts"

export function useTexts() {
  const { getItems } = useDirectusItems()
  return useAsyncData('texts', () => getItems<Texts>({ collection: 'texts', params: { fields: ['id', 'content', 'translations.languages_code', 'translations.content'] } })
  )
}
