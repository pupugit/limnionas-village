<template>
  <div
    :class="`top-logo${miniLogo ? ' scrolled' : ''}${zenMode ? ' zen-mode' : ''}${(showMenu || y < 50 || timedShowLogo) ? ' show-it' : ''}`">
    <LimvilLogo :class="`top-logo-inner click-it${showMenu ? ' show-it' : ''}`" @click="clickLogo" suid="limvil-logo" />
    <div @click="toggleLocales" style=";position:absolute;top:0;left:0;cursor:pointer;">
      {{ locale }}
    </div>
    <div :class="`top-menu${showMenu ? ' show-it' : ''}`" ref="menu">
      <div>
        <nuxt-link to="/">
          {{ $t('home') }}
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/houses">
          {{ $t('houses') }}
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/contact">
          {{ $t('contact') }}
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/samos">
          {{ $t('samos') }}
        </nuxt-link>
      </div>
      <div v-if="locale === 'de'">
        <nuxt-link to="/hiking">
          {{ $t('hiking') }}
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/arrival">
          {{ $t('arrival') }}
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/blog">
          {{ $t('blog') }}
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/guestbook">
          {{ $t('guestbook') }}
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/gallery">
          {{ $t('gallery') }}
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/tos">
          {{ $t('tos') }}
        </nuxt-link>
      </div>
    </div>
  </div>
  <!-- <div v-if="router.currentRoute.value.path === '/' && y > 200" class="arrow-up" @click="goTop">
    <SymbolArrowUp />
  </div> -->
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const zenMode = useZenMode()
const { y } = useWindowScroll()
const miniLogo = computed(() => y.value > 200 || route.path !== '/')
const router = useRouter()
const route = useRoute()
const showMenu = ref(false)
const menu = ref<HTMLElement | null>(null)
const timedShowLogo = ref(false)
let timerShowLogo: number | null = null
const lastY = ref(0)
router.afterEach(() => {
  showMenu.value = false
})
onClickOutside(menu, (evt) => {
  // console.log('click outside')
  // console.log(evt)
  if (evt && evt.currentTarget) {
    const t = evt.currentTarget as HTMLElement
    if (t?.classList?.contains('limvil-logo'))
      return
  }
  showMenu.value = false
})
const { availableLocales, locale } = useI18n()
const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

const goTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
const clickLogo = () => {
  console.log('clickLogo')
  showMenu.value = !showMenu.value
  if (!showMenu.value) {
    timedShowLogo.value = true
    if (timerShowLogo) window.clearTimeout(timerShowLogo)
    timerShowLogo = window.setTimeout(() => {
      timedShowLogo.value = false
    }, 2000)
  }
}

watch(y, () => {
  if (y.value < lastY.value) {
    timedShowLogo.value = true
    if (timerShowLogo) window.clearTimeout(timerShowLogo)
    timerShowLogo = window.setTimeout(() => {
      timedShowLogo.value = false
    }, 2000)
  }
  lastY.value = y.value
})
</script>

<style>
.top-symbol {
  width: min(75px, 25vw);
  height: min(75px, 25vw);
}

.arrow-up {
  position: fixed;
  bottom: 5px;
  right: 5px;
  width: min(75px, 25vw);
  cursor: pointer;
  transition: all .5s;
}

.arrow-up:hover {
  color: var(--col-highlight);
}

.top-menu {
  --block-size: min(100pt, 50vw);
  background-color: rgba(255, 255, 255, var(--trans));
  /* border-radius: 0 0 16px 16px; */
  transition: all .5s;
  font-size: 1rem;
  height: 0;
  overflow: hidden;
  width: min(400pt, 85vw);
  box-sizing: border-box;
  align-self: start;
  color: var(--col-main);
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--block-size));
  gap: 24px;
  padding: 0 16px;
  justify-content: center;
  text-align: center;
}

.top-menu>div>a {
  color: var(--col-main);
  font-size: 20px;
}

.top-menu.show-it {

  height: 100%;
  padding: 16px;
}

.top-menu>div>* {
  cursor: pointer;
  transition: all .5s;
}

.top-menu>div:hover>* {
  color: var(--col-sub);
}

.top-logo.zen-mode {
  visibility: hidden;
  opacity: 0;
}

.top-logo {
  width: 100vw;
  position: sticky;
  z-index: 200;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  transition: all .5s;
  top: -300px;
}

.top-logo.show-it {
  top: 0;
}

.top-logo-inner {
  background-color: rgba(255, 255, 255, 0);
  width: min(400pt, 85vw);
  box-sizing: border-box;
  padding-top: 16px;
  transition: all .5s ease-out;
}

@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .top-logo-inner {
    width: min(400pt, 85vw);
  }
}

.top-logo.scrolled.show-it {
  top: 0;
}

.scrolled>.top-logo-inner {
  background-color: rgba(255, 255, 255, var(--trans));
  padding: 16px 24px;
  /* border-radius: 24px; */

}
</style>
