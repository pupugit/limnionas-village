import type { RouterConfig } from '@nuxt/schema'
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  scrollBehavior: (to, from, savedPosition) => {
    //console.log(from.name, to.name, savedPosition)
    if (from?.name === 'index' && to?.name === 'house-letter') {
      //console.log('reading scrollPos ', window.scrollY)
      useScrollState().value.scrollPos = window.scrollY
    } else if (from?.name === 'house-letter' && to?.name === 'index') {
      //console.log('setting scrollPos to ', useScrollState().value.scrollPos)
      //return { x: 0, y: useScrollState().value.scrollPos }
    } else {
      window.scrollTo(0, 0)
      useScrollState().value.scrollPos = 0
    }
    return savedPosition || { x: 0, y: 0 }
  }
}
