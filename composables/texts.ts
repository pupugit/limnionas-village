import type { Texts } from "~/types/texts"

export const useTexts = () => useState<Texts[]>('texts', () => {
  return []
})

export const initTexts = async () => {
  const { getItems } = useDirectusItems()
  const texts = useTexts()
  if (texts.value.length === 0) {
    const hItems = await getItems<Texts[]>({ collection: 'texts', params: { fields: ['id', 'content', 'translations.languages_code', 'translations.content'] } })
    texts.value = hItems
  }
}
