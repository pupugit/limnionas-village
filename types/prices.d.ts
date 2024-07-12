export type Season = {
  start: string
  end: string
  name: string
}
export type TaxEntry = {
  from: string
  tax: number
}
export type Prices = {
  id: number
  seasons: Season[]
  visitors_tax: TaxEntry[]
  foto?: string
}
