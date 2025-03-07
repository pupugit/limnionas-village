export const randInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const mergeHead = (locale: string, title: string, desc: string, image: string) => {
  let mergeTitle = 'Limnionas Village'
  if (title) mergeTitle = `${title} - Limnionas Village`
  const mergeDesc = desc || 'Welcome to Limnionas Village'
  const mergeImage = image || 'https://limnionas-village.net/limvil-picture.png'
  const mergeLocale = locale || 'en'
  useHead({
    htmlAttrs: {
      lang: mergeLocale,
    },
    title: mergeTitle,
    link: [{
      rel: 'icon',
      href: 'https://limnionas-village.net/favicon.ico',
      type: 'image/x-icon'
    }],
    meta: [{
      property: 'description',
      content: mergeDesc,
    }, {
      property: 'og:site_name',
      content: 'Limnionas Village',
    }, {
      property: 'og:title',
      content: mergeTitle,
    }, {
      property: 'og:image',
      content: mergeImage
    }, {
      property: 'og:image:height',
      content: '350',
    }, {
      property: 'og:image:width',
      content: '350',
    }, {
      property: 'og:description',
      content: mergeDesc,
    }]
  })
}
