export type Weather = {
  info: {
    temp_c: number
    condition: {
      text: string
      icon: text
      code: number
    }
    wind_kph: number
    precip_mm: number
    humidity: number
    cloud: number
    feelslike_c: number
  }
}
