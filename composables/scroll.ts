export type ScrollState = {
  isScrolled: boolean
  scrollPos: number
}
export const useZenMode = () => useState<boolean>('zenMode', () => false)
export const useBackgroundImageState = () => useState<string>('bgImage', () => '')
export const useScrollState = () => useState<ScrollState>('scrolled', () => { return { isScrolled: false, scrollPos: 0 } })
